// aHR0cHM6Ly9naXRodWIuY29tL2x1b3N0MjYvYWNhZGVtaWMtaG9tZXBhZ2U=
$(function () {
    $('.lazy').Lazy({
        scrollDirection: 'vertical',
        effect: 'fadeIn',
        effectTime: 300,
        visibleOnly: true,
        placeholder: "",
        onError: function(element) {
            console.log('[lazyload] Error loading ' + element.data('src'));
        }
    })
    $('[data-toggle="tooltip"]').tooltip()

    const search = document.getElementById('publication-search')
    if (!search) return

    const entries = Array.from(document.querySelectorAll('.publication-entry'))
    const desktopEntries = Array.from(document.querySelectorAll('.publication-entry-desktop'))
    const count = document.getElementById('publication-count')
    const empty = document.getElementById('publication-empty')
    const clear = document.getElementById('publication-search-clear')

    function updatePublicationSearch() {
        const query = search.value.trim().toLowerCase()
        let matches = 0

        entries.forEach(function (entry) {
            const visible = !query || entry.dataset.publicationSearch.toLowerCase().includes(query)
            entry.hidden = !visible
        })

        desktopEntries.forEach(function (entry) {
            if (!entry.hidden) matches += 1
        })

        count.textContent = query ? `${matches} of ${desktopEntries.length} publications` : `${desktopEntries.length} publications`
        empty.hidden = matches !== 0
        clear.hidden = !query
    }

    search.addEventListener('input', updatePublicationSearch)
    clear.addEventListener('click', function () {
        search.value = ''
        updatePublicationSearch()
        search.focus()
    })
})
