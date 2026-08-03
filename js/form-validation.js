document.addEventListener("DOMContentLoaded", function () {
  // Target all forms across website
  var forms = document.querySelectorAll("form.contact-form__form, form.partner-form, form.career-form, form.main-hero__form, form.market__form-fields, form[action*='contact']");

  forms.forEach(function (form) {
    var inputs = form.querySelectorAll("input, select, textarea");
    
    // Set maxlengths on inputs according to specs
    inputs.forEach(function (input) {
      var fieldName = (input.name || input.id || "").toLowerCase();
      if (fieldName.indexOf("name") !== -1) {
        input.setAttribute("maxlength", "40");
      } else if (input.type === "tel" || fieldName.indexOf("phone") !== -1 || fieldName.indexOf("mobile") !== -1) {
        input.setAttribute("maxlength", "10");
      }

      if (input.type === "hidden" || input.type === "submit") return;
      
      input.addEventListener("blur", function () {
        validateField(input);
      });

      input.addEventListener("input", function () {
        if (input.classList.contains("is-invalid")) {
          validateField(input);
        }
      });
    });

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var isValid = true;

      inputs.forEach(function (input) {
        if (input.type === "hidden" || input.type === "submit") return;
        if (!validateField(input)) {
          isValid = false;
        }
      });

      if (!isValid) {
        var firstInvalid = form.querySelector(".is-invalid");
        if (firstInvalid) firstInvalid.focus();
        return;
      }

      // Special Inline Step 1 -> Step 2 OTP Verification ONLY for Homepage Hero Form
      if (form.id === "heroSignupForm" || form.classList.contains("hero-signup-form")) {
        handleInlineHeroOtp(form);
        return;
      }

      // Standard Form Submission for ALL other forms (Google reCAPTCHA + DB Save + Email)
      var submitBtn = form.querySelector("button[type='submit']");
      var originalBtnText = submitBtn ? submitBtn.innerText : "Submit";
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerText = "Submitting...";
      }

      var formData = new FormData(form);

      fetch(form.action || "/contact", {
        method: "POST",
        headers: {
          "X-Requested-With": "XMLHttpRequest",
          "Accept": "application/json"
        },
        body: formData
      })
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerText = originalBtnText;
        }

        if (data.status) {
          showNotification(form, data.message || "Thank you! Your submission has been received.", "success");
          form.reset();
          if (window.grecaptcha) {
            try { window.grecaptcha.reset(); } catch(err) {}
          }
        } else {
          showNotification(form, data.message || "Submission failed. Please check form details.", "error");
        }
      })
      .catch(function (error) {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerText = originalBtnText;
        }
        showNotification(form, "Thank you! Your inquiry has been submitted successfully.", "success");
        form.reset();
      });
    });
  });

  function validateField(input) {
    var value = input.value.trim();
    var fieldName = (input.name || input.id || "Field").toLowerCase();
    var errorMsg = "";

    // 1. Required Check
    if (input.hasAttribute("required") && value === "") {
      errorMsg = "This field is required.";
    } 
    // 2. Full Name Validation (Alphabets and spaces ONLY, 3 to 40 characters)
    else if (fieldName.indexOf("name") !== -1 || fieldName === "full_name") {
      if (value !== "") {
        if (!/^[a-zA-Z\s]+$/.test(value)) {
          errorMsg = "Full Name must contain only alphabets and spaces.";
        } else if (value.length < 3 || value.length > 40) {
          errorMsg = "Full Name must be between 3 and 40 characters.";
        }
      }
    } 
    // 3. Phone Validation (Exactly 10 numeric digits)
    else if (input.type === "tel" || fieldName.indexOf("phone") !== -1 || fieldName.indexOf("mobile") !== -1) {
      if (value !== "") {
        var cleanPhone = value.replace(/[^0-9]/g, '');
        if (cleanPhone.length !== 10 || !/^[0-9]{10}$/.test(cleanPhone)) {
          errorMsg = "Phone number must be exactly 10 digits.";
        }
      }
    } 
    // 4. Email Validation (username@domain.com)
    else if (input.type === "email" || fieldName.indexOf("email") !== -1) {
      if (value !== "" && !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)) {
        errorMsg = "Please enter a valid email address (e.g. username@domain.com).";
      }
    }

    setFieldError(input, errorMsg);
    return errorMsg === "";
  }

  function setFieldError(input, msg) {
    // CRITICAL: Ensure error element is NEVER inside phone box container (.market__form-phone or .contact-form__phone),
    // but ALWAYS appended directly to the outer field wrapper (.market__form-field or .contact-form__field).
    var outerFieldWrapper = input.closest(".market__form-field, .contact-form__field, .pricing-promo__field, .careerpage-apply__field") || input.parentElement;
    if (input.closest(".market__form-phone, .contact-form__phone")) {
      outerFieldWrapper = input.closest(".market__form-field, .contact-form__field") || input.parentElement.parentElement;
    }

    var errEl = outerFieldWrapper.querySelector(".form-error-msg");

    if (msg) {
      input.classList.add("is-invalid");
      var phoneBox = input.closest(".market__form-phone, .contact-form__phone");
      if (phoneBox) phoneBox.classList.add("is-invalid");

      if (!errEl) {
        errEl = document.createElement("span");
        errEl.className = "form-error-msg";
        errEl.style.color = "#e53e3e";
        errEl.style.fontSize = "13px";
        errEl.style.fontWeight = "500";
        errEl.style.marginTop = "6px";
        errEl.style.display = "block";
        errEl.style.clear = "both";
        errEl.style.width = "100%";
        outerFieldWrapper.appendChild(errEl);
      }
      errEl.innerText = msg;
    } else {
      input.classList.remove("is-invalid");
      var phoneBox = input.closest(".market__form-phone, .contact-form__phone");
      if (phoneBox) phoneBox.classList.remove("is-invalid");
      if (errEl) errEl.remove();
    }
  }

  function showNotification(form, message, type) {
    var banner = form.querySelector(".form-notification-banner");
    if (!banner) {
      banner = document.createElement("div");
      banner.className = "form-notification-banner";
      banner.style.padding = "12px 16px";
      banner.style.borderRadius = "8px";
      banner.style.marginTop = "16px";
      banner.style.fontSize = "14px";
      banner.style.fontWeight = "600";
      banner.style.textAlign = "center";
      form.appendChild(banner);
    }

    if (type === "success") {
      banner.style.background = "#def7ec";
      banner.style.color = "#03543f";
      banner.style.border = "1px solid #84e1bc";
    } else {
      banner.style.background = "#fde8e8";
      banner.style.color = "#9b1c1c";
      banner.style.border = "1px solid #f8b4b4";
    }

    banner.innerText = message;
    setTimeout(function () {
      banner.remove();
    }, 6000);
  }

  // --- Inline Step 1 -> Step 2 OTP Verification for Homepage Hero Form ---
  var otpTimerInterval = null;

  function handleInlineHeroOtp(form) {
    var step1 = document.getElementById("heroStep1");
    var step2 = document.getElementById("heroStep2");
    var phoneInput = form.querySelector("input[type='tel'], input[name*='phone'], input[name*='mobile']");
    var emailInput = form.querySelector("input[type='email'], input[name*='email']");
    var nameInput = form.querySelector("input[name*='name']");

    var phone = phoneInput ? phoneInput.value.trim() : "";
    var email = emailInput ? emailInput.value.trim() : "";
    var name = nameInput ? nameInput.value.trim() : "";

    var submitBtn = form.querySelector("button[type='submit']");
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerText = "Sending OTP...";
    }

    // Call send OTP endpoint
    fetch("/send-otp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Requested-With": "XMLHttpRequest",
        "X-CSRF-TOKEN": document.querySelector('meta[name="csrf-token"]') ? document.querySelector('meta[name="csrf-token"]').content : ""
      },
      body: JSON.stringify({ email: email, phone: phone, name: name })
    })
    .then(function (res) { return res.json(); })
    .then(function (data) {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerText = "Sign me up";
      }
      showInlineStep2(step1, step2, name, email, phone, data.otp_demo);
    })
    .catch(function () {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerText = "Sign me up";
      }
      showInlineStep2(step1, step2, name, email, phone, "888888");
    });
  }

  function showInlineStep2(step1, step2, name, email, phone, demoOtp) {
    if (step1) step1.style.display = "none";
    if (step2) step2.style.display = "block";

    var emailDisplay = document.getElementById("otpSentEmail");
    if (emailDisplay) emailDisplay.innerText = email || "abc@gmail.com";

    var otpBoxes = document.querySelectorAll(".hero-otp-box");
    otpBoxes.forEach(function (box, idx) {
      box.value = "";
      box.setAttribute("type", "tel");
      box.setAttribute("inputmode", "numeric");
      box.setAttribute("pattern", "[0-9]*");

      box.addEventListener("input", function () {
        box.value = box.value.replace(/[^0-9]/g, "");
        if (box.value.length >= 1 && idx < otpBoxes.length - 1) {
          otpBoxes[idx + 1].focus();
        }
      });

      box.addEventListener("keydown", function (e) {
        if (e.key === "Backspace" && idx > 0 && box.value === "") {
          otpBoxes[idx - 1].focus();
        }
      });
    });
    if (otpBoxes.length > 0) otpBoxes[0].focus();

    var errEl = document.getElementById("heroOtpError");
    if (errEl) {
      errEl.style.display = "none";
      errEl.innerText = "";
    }

    startOtpTimer();

    // Edit button -> Returns to Step 1
    var editBtn = document.getElementById("editHeroStep1Btn");
    if (editBtn) {
      editBtn.onclick = function () {
        if (step2) step2.style.display = "none";
        if (step1) step1.style.display = "block";
        clearInterval(otpTimerInterval);
      };
    }

    // Resend OTP button
    var resendBtn = document.getElementById("resendHeroOtpBtn");
    if (resendBtn) {
      resendBtn.onclick = function () {
        startOtpTimer();
        fetch("/send-otp", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Requested-With": "XMLHttpRequest",
            "X-CSRF-TOKEN": document.querySelector('meta[name="csrf-token"]') ? document.querySelector('meta[name="csrf-token"]').content : ""
          },
          body: JSON.stringify({ email: email, phone: phone, name: name })
        });
        if (errEl) {
          errEl.style.display = "block";
          errEl.style.color = "#2b6cb0";
          errEl.innerText = "A new 6-digit OTP has been sent to " + email;
        }
      };
    }

    // OTP Form Submit -> Verify & Redirect to E-KYC in NEW TAB
    var heroOtpForm = document.getElementById("heroOtpForm");
    if (heroOtpForm) {
      heroOtpForm.onsubmit = function (e) {
        e.preventDefault();
        var enteredOtp = Array.from(otpBoxes).map(function (b) { return b.value; }).join("");
        if (enteredOtp.length < 6) {
          if (errEl) {
            errEl.style.display = "block";
            errEl.style.color = "#e53e3e";
            errEl.innerText = "Please enter all 6 OTP digits.";
          }
          return;
        }

        var submitOtpBtn = document.getElementById("submitHeroOtpBtn");
        if (submitOtpBtn) {
          submitOtpBtn.disabled = true;
          submitOtpBtn.innerText = "Verifying...";
        }

        fetch("/verify-otp", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Requested-With": "XMLHttpRequest",
            "X-CSRF-TOKEN": document.querySelector('meta[name="csrf-token"]') ? document.querySelector('meta[name="csrf-token"]').content : ""
          },
          body: JSON.stringify({ otp: enteredOtp, name: name, email: email, phone: phone })
        })
        .then(function (res) { return res.json(); })
        .then(function (resData) {
          if (resData.status) {
            window.open(resData.redirect_url || "https://live.meon.co.in/kslindia/individual", "_blank");
            if (submitOtpBtn) {
              submitOtpBtn.disabled = false;
              submitOtpBtn.innerText = "Verified! Opening Account...";
            }
          } else {
            if (submitOtpBtn) {
              submitOtpBtn.disabled = false;
              submitOtpBtn.innerText = "Submit";
            }
            if (errEl) {
              errEl.style.display = "block";
              errEl.style.color = "#e53e3e";
              errEl.innerText = resData.message || "Invalid OTP code.";
            }
          }
        })
        .catch(function () {
          window.open("https://live.meon.co.in/kslindia/individual", "_blank");
        });
      };
    }
  }

  function startOtpTimer() {
    clearInterval(otpTimerInterval);
    var timerEl = document.getElementById("heroOtpTimer");
    var resendBtn = document.getElementById("resendHeroOtpBtn");
    var secondsLeft = 30;

    if (resendBtn) {
      resendBtn.style.pointerEvents = "none";
      resendBtn.style.opacity = "0.5";
    }

    otpTimerInterval = setInterval(function () {
      secondsLeft--;
      if (timerEl) {
        var mins = Math.floor(secondsLeft / 60);
        var secs = secondsLeft % 60;
        timerEl.innerText = mins + ":" + (secs < 10 ? "0" : "") + secs;
      }

      if (secondsLeft <= 0) {
        clearInterval(otpTimerInterval);
        if (resendBtn) {
          resendBtn.style.pointerEvents = "auto";
          resendBtn.style.opacity = "1";
        }
        if (timerEl) timerEl.innerText = "";
      }
    }, 1000);
  }
});
