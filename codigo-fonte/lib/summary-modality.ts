// Ofertas exclusivamente assíncronas não precisam de plataforma para encontros.
export function needsConference(modality:string) {
 const value=modality.toLocaleLowerCase('pt-BR');
 return !(/autoinstrucional|totalmente assíncrono|inteiramente assíncrono|100% assíncrono/.test(value)||value==='assíncrono com baixo consumo de dados');
}
