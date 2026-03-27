      let dados = [
        {
          id: 1,
          titulo: 'Martelo de Carpinteiro',
          cat: 'Ferramentas',
          preco: 'R$ 89,90',
          desc: 'Martelo profissional em aço forjado com cabo de madeira de lei. Ideal para trabalhos de construção e marcenaria. Peso 500g, excelente equilíbrio.',
          tags: ['novo', 'madeira', 'profissional'],
          local: 'São Paulo, SP',
          contato: '(11) 99999-1234',
          badge: 'Destaque',
        },
        {
          id: 2,
          titulo: 'Marmoraria Casa Bella',
          cat: 'Serviços',
          preco: 'Sob consulta',
          desc: 'Serviços de mármore e granito para cozinhas, banheiros e fachadas. 15 anos de experiência. Orçamento grátis!',
          tags: ['mármore', 'granito', 'reforma'],
          local: 'Campinas, SP',
          contato: '(19) 98888-4321',
          badge: '',
        },
        {
          id: 3,
          titulo: 'Mangueira de Jardim 50m',
          cat: 'Ferramentas',
          preco: 'R$ 145,00',
          desc: 'Mangueira reforçada com 50 metros, resistente ao sol e dobramento. Acompanha bico regulável multifunção.',
          tags: ['jardim', 'irrigação', 'quintal'],
          local: 'Belo Horizonte, MG',
          contato: '(31) 97777-5555',
          badge: '',
        },
        {
          id: 4,
          titulo: 'Mandíbula de Fixação',
          cat: 'Ferramentas',
          preco: 'R$ 67,00',
          desc: 'Grampo de bancada tipo G em ferro fundido 6 polegadas. Ótimo estado, pouco uso.',
          tags: ['grampo', 'bancada', 'usado'],
          local: 'Rio de Janeiro, RJ',
          contato: '(21) 96666-7777',
          badge: 'Usado',
        },
        {
          id: 5,
          titulo: 'Manual de Eletricidade',
          cat: 'Outros',
          preco: 'R$ 35,00',
          desc: 'Livro completo de instalações elétricas residenciais e comerciais. Edição 2022, como novo.',
          tags: ['livro', 'elétrica', 'técnico'],
          local: 'Curitiba, PR',
          contato: '(41) 95555-2222',
          badge: '',
        },
        {
          id: 6,
          titulo: 'Marido de Aluguel – Reparos',
          cat: 'Serviços',
          preco: 'A partir R$ 80/h',
          desc: 'Serviços gerais: pintura, montagem de móveis, reparos elétricos e hidráulicos. Pontualidade garantida.',
          tags: ['reparos', 'pintura', 'hidráulica'],
          local: 'Fortaleza, CE',
          contato: '(85) 94444-3333',
          badge: '',
        },
      ]

      let filtrado = [...dados]
      let searchTerm = ''

      function highlight(text, term) {
        if (!term) return text
        const re = new RegExp(
          `(${term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`,
          'gi'
        )
        return text.replace(re, '<mark>$1</mark>')
      }

      function renderGrid(items) {
        const grid = document.getElementById('grid')
        const label = document.getElementById('sectionLabel')
        label.textContent = searchTerm
          ? `${items.length} resultado${items.length !== 1 ? 's' : ''} para "${searchTerm}"`
          : 'Todos os anúncios'

        if (!items.length) {
          grid.innerHTML = `<div class="empty-state"><div class="big">🔍</div><p>Nenhum classificado encontrado para "<strong>${searchTerm}</strong>"</p></div>`
          return
        }

        grid.innerHTML = items
          .map(
            (d, i) => `
    <div class="card" style="animation-delay:${i * 0.06}s" onclick="openCard(${d.id})">
      ${d.badge ? `<span class="card-badge">${d.badge}</span>` : ''}
      <div class="card-category">${d.cat}</div>
      <div class="card-title">${highlight(d.titulo, searchTerm)}</div>
      <div class="card-desc">${highlight(d.desc.substring(0, 90) + '…', searchTerm)}</div>
      <div class="card-footer">
        <span class="card-price">${d.preco}</span>
        <span class="card-contact">📍 ${d.local.split(',')[0]}</span>
      </div>
    </div>
  `
          )
          .join('')
      }

      function doSearch() {
        searchTerm = document.getElementById('searchInput').value.trim()
        if (!searchTerm) {
          filtrado = [...dados]
        } else {
          const q = searchTerm.toLowerCase()
          filtrado = dados.filter(
            (d) =>
              d.titulo.toLowerCase().includes(q) ||
              d.desc.toLowerCase().includes(q) ||
              d.cat.toLowerCase().includes(q) ||
              d.tags.some((t) => t.toLowerCase().includes(q))
          )
        }
        renderGrid(filtrado)
      }

      document.getElementById('searchInput').addEventListener('input', doSearch)
      document
        .getElementById('searchInput')
        .addEventListener('keydown', (e) => {
          if (e.key === 'Enter') doSearch()
        })

      function openCard(id) {
        const d = dados.find((x) => x.id === id)
        if (!d) return
        document.getElementById('mCat').textContent = d.cat
        document.getElementById('mTitle').textContent = d.titulo
        document.getElementById('mPrice').textContent = d.preco
        document.getElementById('mDesc').textContent = d.desc
        document.getElementById('mTags').innerHTML = d.tags
          .map((t) => `<span class="tag">${t}</span>`)
          .join('')
        document.getElementById('mInfo').innerHTML = `
    <div class="info-item"><div class="info-label">Localização</div><div class="info-val">${d.local}</div></div>
    <div class="info-item"><div class="info-label">Contato</div><div class="info-val">${d.contato}</div></div>
    <div class="info-item"><div class="info-label">Categoria</div><div class="info-val">${d.cat}</div></div>
    <div class="info-item"><div class="info-label">Anúncio Nº</div><div class="info-val">#${String(d.id).padStart(4, '0')}</div></div>
  `
        document.getElementById('mContact').textContent =
          `Contatar: ${d.contato}`
        openOverlay('viewOverlay')
      }

      function openOverlay(id) {
        document.getElementById(id).classList.add('active')
      }
      function closeOverlay(id) {
        document.getElementById(id).classList.remove('active')
      }

      function closeViewModal(e) {
        if (e.target === document.getElementById('viewOverlay'))
          closeOverlay('viewOverlay')
      }
      function closeViewModal2(e) {
        if (e.target === document.getElementById('addOverlay'))
          closeOverlay('addOverlay')
      }

      function openAddModal() {
        openOverlay('addOverlay')
      }

      function addClassificado() {
        const titulo = document.getElementById('fTitle').value.trim()
        const cat = document.getElementById('fCat').value
        const preco = document.getElementById('fPrice').value
        const desc = document.getElementById('fDesc').value.trim()
        const contato = document.getElementById('fContact').value.trim()
        const local = document.getElementById('fLocal').value.trim()
        const tagsStr = document.getElementById('fTags').value.trim()

        if (!titulo || !desc) {
          alert('Preencha ao menos o título e a descrição.')
          return
        }

        const novoId = dados.length
          ? Math.max(...dados.map((d) => d.id)) + 1
          : 1
        dados.unshift({
          id: novoId,
          titulo,
          cat,
          preco: preco
            ? `R$ ${parseFloat(preco).toFixed(2).replace('.', ',')}`
            : 'Sob consulta',
          desc,
          tags: tagsStr
            ? tagsStr
                .split(',')
                .map((t) => t.trim())
                .filter(Boolean)
            : [],
          local: local || 'Brasil',
          contato: contato || 'Não informado',
          badge: 'Novo',
        })

        // clear form
        ;['fTitle', 'fPrice', 'fDesc', 'fContact', 'fLocal', 'fTags'].forEach(
          (id) => (document.getElementById(id).value = '')
        )
        closeOverlay('addOverlay')
        searchTerm = ''
        document.getElementById('searchInput').value = ''
        filtrado = [...dados]
        renderGrid(filtrado)
      }

      renderGrid(dados)
    