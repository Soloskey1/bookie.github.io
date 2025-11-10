        // --- Mobile Menu Logic (NEW/UPDATED) ---
        const sidebar = document.getElementById('sidebar');
        const backdrop = document.querySelector('.sidebar-backdrop');
        
        /**
         * Toggles the visibility and width of the sidebar menu.
         */
        function toggleSidebar() {
            sidebar.classList.toggle('open');
            backdrop.classList.toggle('visible');
        }

        /**
         * Closes the sidebar menu.
         */
        function closeSidebar() {
            sidebar.classList.remove('open');
            backdrop.classList.remove('visible');
        }

        document.addEventListener('DOMContentLoaded', () => {
            // Set current year in footer
            document.getElementById('currentYear').textContent = new Date().getFullYear();
            
            // --- Footer Accordion Logic (Mobile Only) ---
            const footerTitles = document.querySelectorAll('.footer-title');
            const mdBreakpoint = 768; // Matches CSS media query

            // Helper function to toggle the submenu
            function toggleFooterSubmenu(submenu, title) {
                const isOpen = submenu.getAttribute('data-open') === 'true';

                // Temporarily disable transition for immediate height setting when closing
                submenu.style.transition = 'none';

                if (isOpen) {
                    // Closing: Measure height, set it, then enable transition and close.
                    submenu.style.maxHeight = submenu.scrollHeight + 'px'; 
                    requestAnimationFrame(() => {
                        // Re-enable transition for closing animation
                        submenu.style.transition = 'max-height 0.4s ease-out, opacity 0.4s ease-out, padding 0.4s ease-out';
                        submenu.style.maxHeight = '0';
                        submenu.style.opacity = '0';
                        submenu.setAttribute('data-open', 'false');
                        title.classList.remove('is-open');
                    });
                } else {
                    // Opening: Enable transition, set max height
                    submenu.style.transition = 'max-height 0.4s ease-in, opacity 0.4s ease-in, padding 0.4s ease-in';
                    submenu.style.maxHeight = submenu.scrollHeight + 'px';
                    submenu.style.opacity = '1';
                    submenu.setAttribute('data-open', 'true');
                    title.classList.add('is-open');
                    
                    // Reset max-height after transition to handle dynamic content (optional)
                    submenu.addEventListener('transitionend', function handler() {
                        if (submenu.getAttribute('data-open') === 'true') {
                            submenu.style.maxHeight = '500px'; // Revert to a large enough value
                        }
                        submenu.removeEventListener('transitionend', handler);
                    });
                }
            }


            // Set initial state based on screen size
            if (window.innerWidth >= mdBreakpoint) {
                document.querySelectorAll('.footer-submenu').forEach(submenu => {
                    submenu.setAttribute('data-open', 'true');
                    submenu.previousElementSibling.classList.remove('is-open');
                });
            }

            footerTitles.forEach(title => {
                title.addEventListener('click', () => {
                    // Only run accordion logic on screens smaller than md (768px)
                    if (window.innerWidth < mdBreakpoint) {
                        const targetId = title.getAttribute('data-target');
                        const submenu = document.getElementById(targetId);
                        if (submenu) {
                            toggleFooterSubmenu(submenu, title);
                        }
                    }
                });
            });

          
          // Re-apply desktop state on window resize
            window.addEventListener('resize', () => {
                if (window.innerWidth >= mdBreakpoint) {
                    document.querySelectorAll('.footer-submenu').forEach(submenu => {
                        submenu.setAttribute('data-open', 'true');
                        submenu.previousElementSibling.classList.remove('is-open');
                    });
                } else {
                    // On mobile, collapse if the element was open when transitioning from desktop
                    document.querySelectorAll('.footer-submenu').forEach(submenu => {
                        if (submenu.getAttribute('data-open') === 'true') {
                             submenu.style.maxHeight = '500px'; // Reset for proper height calculation if toggled
                        }
                    });
                }
            });


            // --- Subscription Form Submission ---
            const subscribeForm = document.getElementById('subscribeForm');
            if (subscribeForm) {
                subscribeForm.addEventListener('submit', handleSubscription);
            }

            /**
             * Handles the subscription form submission (mock submission).
             */
            async function handleSubscription(event) {
                event.preventDefault();
                
                const form = document.getElementById('subscribeForm');
                const button = form.querySelector('.subscribe-button');
                const message = document.getElementById('subscribeMessage');
                
                // Show loading state
                button.textContent = 'Subscribing...';
                button.disabled = true;
                message.textContent = ''; // Clear previous message

                // Helper function for delay
                const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

                // Mock API call delay
                await delay(1500);

                // Display success message
                message.textContent = 'Success! Check your email for your free books. Welcome to the club!';
                form.reset();

                await delay(1000);

                button.textContent = 'Claim My Free Books!';
                button.disabled = false;

                await delay(4000);

                message.textContent = '';
            }
        });