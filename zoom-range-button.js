  class ZoomRangeButton extends HTMLElement {
    set hass(value) {
      this._hass = value;
    }

    setConfig(config) {
      this._config = config;
    }

    connectedCallback() {
      this.innerHTML = `<ha-card>
        <button style="width:100%;padding:16px;font-size:1em;cursor:pointer">
          Set Charge Window
        </button>
      </ha-card>`;
      this.querySelector('button').addEventListener('click', () => {
        const card = this.deepQuery(document, 'apexcharts-card');
        if (!card) { alert('Chart not found'); return; }
        const chart = card._apexChart;
        if (!chart) { alert('Chart instance not found'); return; }

        const toLocalISO = ts => {
          const d = new Date(ts);
          const pad = n => String(n).padStart(2, '0');
          return `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}:00`;
        };

        this._hass.callService('easee', 'set_basic_charge_plan', {
          device_id: this._config.device_id,
          start_datetime: toLocalISO(chart.w.globals.minX),
          stop_datetime:  toLocalISO(chart.w.globals.maxX),
          repeat:  this._config.repeat  ?? true,
          current: this._config.current ?? 16,
        });
      });
    }

    deepQuery(root, selector) {
      const el = root.querySelector(selector);
      if (el) return el;
      for (const node of root.querySelectorAll('*')) {
        if (node.shadowRoot) {
          const found = this.deepQuery(node.shadowRoot, selector);
          if (found) return found;
        }
      }
      return null;
    }
  }
  customElements.define('zoom-range-button', ZoomRangeButton);
