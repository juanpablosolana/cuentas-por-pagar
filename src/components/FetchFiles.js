import React, { useEffect, useState } from 'react'
import axios from 'axios'


function useCfdi(token) {
  const headers = `Bearer ${token}`;
  const [cfdi, setCfdi] = useState([])

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/v1/cfdi", {
        headers: { Authorization: headers },
      })
      .then(response => {
        response.data= response.data.filter(valor => valor.timbreFiscal !== undefined)
        response.data = response.data.filter(valor => valor.impuestos !== undefined)

      /*   dataFilter = response.data.filter(valor => valor.fiscal !== undefined) */
        console.log(response.data)
        setCfdi(response.data)
      })
      .catch((err) => {
        console.log(err);
      });

  }, [])

  return cfdi
}

const Render = ({ token }) => {

  const files = useCfdi( token )
  return (
    <>{
      files.map(item => (

      <details >
      <summary>
            Folio SAT: {item.timbreFiscal.uuid.toUpperCase()}
      </summary>
          <section className="grid">
            <h2>Datos de la factura</h2>
              <p className="item">Serie: {item.serie}</p>
              <p className="item">Folio: {item.folio}</p>
              <p className="item">Lugar: {item.lugarExpedicion}</p>
              <p className="item">Certificado CSD: {item.noCertificado}</p>
              <p className="item">Certificado SAT : {item.timbreFiscal.noCertificadoSAT}</p>
              <p className="item"> Folio Sat: {item.timbreFiscal.uuid}</p>
              <p className="item">Fecha de certificacion: {item.timbreFiscal.fechaTimbrado}</p>
              <p className="item">Fecha de emision: {item.fecha}</p>
              <p className="item">Comprobante: {item.tipoDeComprobante}</p>
              <div></div> <h2> Emisor </h2> <div></div>
              <p className="item">RFC: {item.emisor.rfc}</p>
              <p className="item"> {item.emisor.nombre}</p>
              <p className="item fiscal">Regimen fiscal: {item.emisor.regimenFiscal}</p>
              <h2> Receptor </h2>
                <p className="item">RFC: {item.receptor.rfc}</p>
                <p className="item">{item.receptor.nombre}</p>
                <p className="item">Uso del CFDI: {item.receptor.usoCFDI}</p>
                <div></div> <h2>Conceptos</h2><div></div>
            {
              item.conceptos.map((element, index) => {
                return (
                  <>
                    <p class="item">Cantindad: ${item.conceptos[index].cantidad}</p>
                    <p class="item">Unidad de medida: ${item.conceptos[index].claveUnidad}</p>
                    <p class="item">Clave del Producto ${item.conceptos[index].claveProdServ}</p>
                    <p class="item">Descripcion: ${item.conceptos[index].descripcion}</p>
                    <p class="item">Valor unitario: ${item.conceptos[index].valorUnitario}</p>
                    <p class="item">Importe: ${item.conceptos[index].importe}</p>
                 </>
              )}).join('\n')
            }
            <h2>Totales</h2><div></div>
            <p className="item">Sub total: ${item.subTotal}</p>
            <p className="item">IVA: ${item.impuestos.totalImpuestosTrasladados}</p>
            <p className="item">Total: ${item.total}</p>
            <p className="item">Moneda: ${item.moneda}</p>
        </section>
      </details>
      ))
 }
</>
  )
}


export default Render;