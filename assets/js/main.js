/* ==========================================================================
   MIDNIGHT VAULT — Interaction layer
   Sticky header, mobile menu, scroll reveal, form validation.
   ========================================================================== */
(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* --- Sticky header ------------------------------------------------------ */
  var header = document.querySelector(".site-header");
  if (header) {
    var onScroll = function () {
      header.classList.toggle("is-stuck", window.scrollY > 24);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* --- Mobile menu -------------------------------------------------------- */
  var toggle = document.querySelector(".nav-toggle");
  var menu = document.getElementById("mobile-menu");

  if (toggle && menu) {
    var setMenu = function (open) {
      toggle.setAttribute("aria-expanded", String(open));
      menu.classList.toggle("is-open", open);
      document.body.style.overflow = open ? "hidden" : "";
    };

    toggle.addEventListener("click", function () {
      setMenu(toggle.getAttribute("aria-expanded") !== "true");
    });

    menu.addEventListener("click", function (e) {
      if (e.target.closest("a")) setMenu(false);
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && menu.classList.contains("is-open")) {
        setMenu(false);
        toggle.focus();
      }
    });
  }

  /* --- Scroll reveal ------------------------------------------------------ */
  var revealables = document.querySelectorAll(".reveal");

  var revealAll = function () {
    Array.prototype.forEach.call(revealables, function (el) {
      el.classList.add("is-visible");
    });
  };

  if (reduceMotion || !("IntersectionObserver" in window)) {
    revealAll();
  } else {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -8% 0px" }
    );
    Array.prototype.forEach.call(revealables, function (el) {
      observer.observe(el);
    });

    // Failsafe: if nothing has revealed after 3s the observer isn't firing.
    // Better a page with no animation than a page with no content.
    window.setTimeout(function () {
      if (!document.querySelector(".reveal.is-visible")) revealAll();
    }, 3000);
  }

  /* --- Contact form validation -------------------------------------------- */
  var form = document.querySelector("[data-venue-form]");

  if (form) {
    var showError = function (field, message) {
      var wrap = field.closest(".field");
      if (!wrap) return;
      var msg = wrap.querySelector(".field-error");
      if (msg && message) msg.textContent = message;
      wrap.classList.add("has-error");
    };

    var clearError = function (field) {
      var wrap = field.closest(".field");
      if (wrap) wrap.classList.remove("has-error");
    };

    var validate = function (field) {
      var value = (field.value || "").trim();

      if (field.hasAttribute("required") && !value) {
        showError(field, "This field is required.");
        return false;
      }
      if (field.type === "email" && value && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value)) {
        showError(field, "Enter a valid email address.");
        return false;
      }
      clearError(field);
      return true;
    };

    var fields = form.querySelectorAll("input, select, textarea");
    var submitAttempted = false;

    Array.prototype.forEach.call(fields, function (field) {
      // Don't scold someone for tabbing past a field they haven't filled yet.
      // Empty required fields only complain once they've tried to submit.
      field.addEventListener("blur", function () {
        if (submitAttempted || (field.value || "").trim()) validate(field);
      });
      field.addEventListener("input", function () {
        var wrap = field.closest(".field");
        if (wrap && wrap.classList.contains("has-error")) validate(field);
      });
    });

    form.addEventListener("submit", function (e) {
      var firstInvalid = null;
      submitAttempted = true;

      Array.prototype.forEach.call(fields, function (field) {
        if (field.type === "hidden") return;
        if (!validate(field) && !firstInvalid) firstInvalid = field;
      });

      if (firstInvalid) {
        e.preventDefault();
        firstInvalid.focus();
        firstInvalid.scrollIntoView({
          behavior: reduceMotion ? "auto" : "smooth",
          block: "center"
        });
        return;
      }

      var submitBtn = form.querySelector("[type=submit]");
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = "Sending…";
      }
    });
  }

  /* --- Footer year -------------------------------------------------------- */
  var year = document.querySelector("[data-year]");
  if (year) year.textContent = new Date().getFullYear();
})();
