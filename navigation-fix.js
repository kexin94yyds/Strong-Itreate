// Navigation fix for UI overlap issue
(function() {
    'use strict';
    
    let currentView = 'default';
    let viewStack = [];
    
    // Fix for the overlap bug when navigating between views
    function cleanupAllViews() {
        // Remove all dynamic views completely
        const dynamicSelectors = [
            '.create-view',
            '.web-creations-view', 
            '.plugin-detail-view',
            '.gpts-list-view',
            '.invest-view-dynamic'
        ];
        
        dynamicSelectors.forEach(selector => {
            const elements = document.querySelectorAll(selector);
            elements.forEach(el => el.remove());
        });
        
        // Hide all main-detail views
        const mainDetails = document.querySelectorAll('.main-detail');
        mainDetails.forEach(detail => {
            detail.style.display = 'none';
        });
        
        // Hide invest view
        const investView = document.querySelector('.invest-view');
        if (investView) {
            investView.style.display = 'none';
        }
        
        // Clear any GSAP animations
        if (window.gsap) {
            gsap.killTweensOf("*");
        }
    }
    
    function returnToCreationsList() {
        // Complete cleanup to prevent overlap
        cleanupAllViews();
        
        currentView = 'default';
        viewStack = [];
        
        // Hide back button
        const backBtn = document.getElementById('nav-back-to-creations-btn');
        if (backBtn) {
            backBtn.style.display = 'none';
        }
        
        // Show main default view
        const mainDefault = document.querySelector('.main-default');
        if (mainDefault) {
            mainDefault.style.display = 'flex';
            
            // Reset any transforms or styles
            mainDefault.style.transform = '';
            mainDefault.style.opacity = '1';
            
            if (window.gsap) {
                gsap.fromTo(mainDefault, 
                    { opacity: 0, scale: 0.95 }, 
                    { opacity: 1, scale: 1, duration: 0.4, ease: "power2.out" }
                );
            }
        }
    }
    
    // Override the existing returnToCreationsList function
    window.returnToCreationsList = returnToCreationsList;
    
    // Add event listener for the back button
    document.addEventListener('DOMContentLoaded', function() {
        const backBtn = document.getElementById('nav-back-to-creations-btn');
        if (backBtn) {
            // Remove existing listeners and add new one
            backBtn.replaceWith(backBtn.cloneNode(true));
            const newBackBtn = document.getElementById('nav-back-to-creations-btn');
            newBackBtn.addEventListener('click', returnToCreationsList);
        }
        
        // Fix for close button (∞)
        const closeButton = document.querySelector('.close');
        if (closeButton) {
            closeButton.addEventListener('click', function() {
                if (currentView !== 'default') {
                    returnToCreationsList();
                }
            });
        }
    });
    
    // Track view changes to prevent overlap
    const originalShowEpisodes = window.showEpisodes;
    if (originalShowEpisodes) {
        window.showEpisodes = function() {
            cleanupAllViews();
            currentView = 'episodes';
            originalShowEpisodes.call(this);
        };
    }
    
})();