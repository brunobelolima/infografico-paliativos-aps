import type {TrailState} from './trail';
export function dissertationAlerts(v:TrailState,network:{measured:boolean;constrained:boolean}){
 const alerts:Record<string,string>={};
 if(v.time&&v.time!=='yes')alerts.participation='Tempo protegido não pactuado ou não confirmado.';
 if(v.pedagogy||(network.measured&&network.constrained))alerts.digital='Usabilidade e inclusão digital apareceram em 6 de 58 unidades de registro (10,34%), com relatos de acesso apenas pelo celular. Teste login, leitura, atividades e presença no aparelho; use arquivos leves. O estudo não quantificou o uso exclusivo de celular.';
 if(v.facilitation&&v.facilitation!=='yes')alerts.facilitation='Responsável por mediação e feedback não disponível ou não confirmado.';
 if(v.specialist&&v.specialist!=='yes')alerts.practice='Equipe e canal de telessaúde não disponíveis ou não confirmados.';
 return alerts;
}
