$('.navbar-toggle').on('click', function() {
    $('.dropdown-toggle').dropdown();
})

if('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/assets/js/service.js')
    .then(function() {
        console.log('Service Worker Registered');
    });
}