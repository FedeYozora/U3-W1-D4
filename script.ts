interface Cappello {
  id: number;
  codprod: number;
  collezione: string;
  capo: string;
  modello: number;
  quantita: number;
  colore: string;
  prezzoivaesclusa: number;
  prezzoivainclusa: number;
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
  prezzoivaesclusa: number;
  prezzoivainclusa: number;
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
    prezzoivaesclusa: number,
    prezzoivainclusa: number,
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
    this.prezzoivaesclusa = prezzoivaesclusa;
    this.prezzoivainclusa = prezzoivainclusa;
    this.disponibile = disponibile;
    this.saldo = saldo;
  }

  getsaldocapo(): number {
    return this.saldo * 0.01 * this.prezzoivainclusa;
  }

  getacquistocapo(): number {
    return this.prezzoivainclusa - this.getsaldocapo();
  }
}

async function fetchCappelli() {
  try {
    const response = await fetch("https://mocki.io/v1/765b2daf-41d5-4e94-a0d5-abd918f57b8f");
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
        cappello.prezzoivaesclusa,
        cappello.prezzoivainclusa,
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
