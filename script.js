/* ==========================================================================
   Compiler Design Lab Manual - JavaScript
   Ubuntu Dark + Wikipedia Styling Helpers
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
    highlightActiveNavLink();
    initCopyButtons();
});

/**
 * Highlights active navigation link based on current page filename
 */
function highlightActiveNavLink() {
    const rawPath = window.location.pathname;
    let currentPath = rawPath.substring(rawPath.lastIndexOf("/") + 1);
    if (!currentPath || currentPath === "") {
        currentPath = "index.html";
    }

    const navLinks = document.querySelectorAll(".nav-links a");
    navLinks.forEach(link => {
        const linkHref = link.getAttribute("href");
        if (linkHref === currentPath) {
            link.classList.add("active");
        } else {
            link.classList.remove("active");
        }
    });
}

/**
 * Attaches clipboard copy functionality to all copy buttons
 */
function initCopyButtons() {
    const copyButtons = document.querySelectorAll(".copy-btn");

    copyButtons.forEach(button => {
        button.addEventListener("click", async () => {
            const container = button.closest(".code-box") || button.closest(".code-container");
            if (!container) return;

            const codeElement = container.querySelector("pre code") || container.querySelector("pre");
            if (!codeElement) return;

            const textToCopy = codeElement.innerText;

            try {
                if (navigator.clipboard && window.isSecureContext) {
                    await navigator.clipboard.writeText(textToCopy);
                } else {
                    fallbackCopy(textToCopy);
                }
                showCopySuccess(button);
            } catch (err) {
                fallbackCopy(textToCopy);
                showCopySuccess(button);
            }
        });
    });
}

function showCopySuccess(button) {
    const originalText = button.textContent;
    button.classList.add("copied");
    button.textContent = "Copied ✓";

    setTimeout(() => {
        button.classList.remove("copied");
        button.textContent = originalText;
    }, 1800);
}

function fallbackCopy(text) {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed";
    textArea.style.top = "-9999px";
    textArea.style.left = "-9999px";
    textArea.setAttribute("readonly", "");
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
        document.execCommand("copy");
    } catch (err) {
        console.error("Copy failed", err);
    }
    document.body.removeChild(textArea);
}
