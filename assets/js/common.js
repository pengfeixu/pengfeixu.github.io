// aHR0cHM6Ly9naXRodWIuY29tL2x1b3N0MjYvYWNhZGVtaWMtaG9tZXBhZ2U=
function initializePublicationSearch() {
    const search = document.getElementById('publication-search')
    if (!search) return

    const entries = Array.from(document.querySelectorAll('.publication-entry'))
    const empty = document.getElementById('publication-empty')
    const clear = document.getElementById('publication-search-clear')

    function updatePublicationSearch() {
        const query = search.value.trim().toLowerCase()
        const isYearSearch = /^\d{4}$/.test(query)
        let hasMatches = false

        entries.forEach(function (entry) {
            const searchableText = entry.dataset.publicationSearch || ''
            const visible = isYearSearch
                ? entry.dataset.publicationYear === query
                : !query || searchableText.toLowerCase().includes(query)
            entry.hidden = !visible
            hasMatches = hasMatches || visible
        })

        empty.hidden = hasMatches
        clear.hidden = !query
    }

    search.addEventListener('input', updatePublicationSearch)
    clear.addEventListener('click', function () {
        search.value = ''
        updatePublicationSearch()
        search.focus()
    })
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializePublicationSearch)
} else {
    initializePublicationSearch()
}

if (window.jQuery) {
    window.jQuery(function ($) {
        if ($.fn.Lazy) {
            $('.lazy').Lazy({
                scrollDirection: 'vertical',
                effect: 'fadeIn',
                effectTime: 300,
                visibleOnly: true,
                placeholder: '',
                onError: function (element) {
                    console.log('[lazyload] Error loading ' + element.data('src'))
                }
            })
        }

        if ($.fn.tooltip) {
            $('[data-toggle="tooltip"]').tooltip()
        }
    })
}
