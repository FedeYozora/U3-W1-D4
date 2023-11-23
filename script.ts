interface Cappello {
  id: number;
  codprod: number;
  collezione: string;
  capo: string;
  modello: number;
  quantita: number;
  colore: string;
  prezzoIvaEsclusa: number;
  prezzoIvaInclusa: number;
  disponibile: string;
  saldo: number;

  getsaldocapo(): number;
  getacquistocapo(): number;
}

class CappelloImpl implements Cappello {
  id: number;
  codprod: number;
  collezione: string;
  capo: string;
  modello: number;
  quantita: number;
  colore: string;
  prezzoIvaEsclusa: number;
  prezzoIvaInclusa: number;
  disponibile: string;
  saldo: number;

  constructor(
    id: number,
    codprod: number,
    collezione: string,
    capo: string,
    modello: number,
    quantita: number,
    colore: string,
    prezzoIvaEsclusa: number,
    prezzoIvaInclusa: number,
    disponibile: string,
    saldo: number
  ) {
    this.id = id;
    this.codprod = codprod;
    this.collezione = collezione;
    this.capo = capo;
    this.modello = modello;
    this.quantita = quantita;
    this.colore = colore;
    this.prezzoIvaEsclusa = prezzoIvaEsclusa;
    this.prezzoIvaInclusa = prezzoIvaInclusa;
    this.disponibile = disponibile;
    this.saldo = saldo;
  }

  getsaldocapo(): number {
    return this.saldo * 0.01 * this.prezzoIvaInclusa;
  }

  getacquistocapo(): number {
    return this.prezzoIvaInclusa - this.getsaldocapo();
  }
}

async function fetchCappelli() {
  try {
    const response = await fetch("https://61fb890c87801d0017a2c55c.mockapi.io/v1/metadata");
    const cappelli: Cappello[] = await response.json();

    cappelli.forEach(cappello => {
      const cappelloImpl = new CappelloImpl(
        cappello.id,
        cappello.codprod,
        cappello.collezione,
        cappello.capo,
        cappello.modello,
        cappello.quantita,
        cappello.colore,
        cappello.prezzoIvaEsclusa,
        cappello.prezzoIvaInclusa,
        cappello.disponibile,
        cappello.saldo
      );

      console.log(cappelloImpl);
      console.log("Il prezzo dopo lo sconto é di: ", cappelloImpl.getacquistocapo().toFixed(2), "€");
    });
  } catch (error) {
    console.error("Error fetch data from API:", error);
  }
}

fetchCappelli();
