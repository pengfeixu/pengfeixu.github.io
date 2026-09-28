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

function initializeNavScrollSpy() {
    const links = Array.from(document.querySelectorAll('.navbar-nav .nav-link'))
    if (!links.length) return

    const sections = []
    links.forEach(function (link) {
        const href = link.getAttribute('href') || ''
        const hashIndex = href.indexOf('#')
        if (hashIndex < 0) return
        const target = document.getElementById(href.slice(hashIndex + 1))
        if (target) sections.push({ link: link, target: target })
    })
    if (!sections.length) return

    let pending = false

    function update() {
        pending = false
        const line = window.pageYOffset + 120
        let current = null
        sections.forEach(function (section) {
            const top = section.target.getBoundingClientRect().top + window.pageYOffset
            if (top <= line) current = section
        })
        const doc = document.documentElement
        if (window.pageYOffset + window.innerHeight >= doc.scrollHeight - 2) {
            current = sections[sections.length - 1]
        }
        if (!current) return
        links.forEach(function (link) {
            const item = link.parentElement
            if (item && item.classList.contains('nav-item')) {
                item.classList.toggle('active', link === current.link)
            }
        })
    }

    function requestUpdate() {
        if (pending) return
        pending = true
        window.requestAnimationFrame(update)
    }

    sections.forEach(function (section) {
        section.link.addEventListener('click', function (event) {
            if (event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0) return
            event.preventDefault()
            section.target.scrollIntoView({ behavior: 'smooth', block: 'start' })
            if (window.history && window.history.replaceState) {
                window.history.replaceState(null, '', '#' + section.target.id)
            }
        })
    })

    window.addEventListener('scroll', requestUpdate, { passive: true })
    window.addEventListener('resize', requestUpdate)
    update()
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializePublicationSearch)
    document.addEventListener('DOMContentLoaded', initializeNavScrollSpy)
} else {
    initializePublicationSearch()
    initializeNavScrollSpy()
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
