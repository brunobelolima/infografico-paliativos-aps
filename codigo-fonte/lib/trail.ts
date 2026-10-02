import {visibleRequirements,type PlatformRequirements} from './platform-requirements';
import {assessPlatforms} from './platform-compatibility';
export const steps=[
 {title:'Público e objetivo',phase:'Análise',question:'Para quem e com qual objetivo oferecer o curso?',description:'Defina o público e o resultado educacional que deseja alcançar.'},
 {title:'Acesso e plataformas',phase:'Análise',question:'Como os profissionais acessarão o curso?',description:'Selecione o município e os requisitos do curso para comparar plataformas de ensino e videoconferência.'},
 {title:'Tempo de participação',phase:'Análise',question:'Há condições de conciliar formação e trabalho?',description:'A boa conexão precisa ser acompanhada de disponibilidade real para participar.'},
 {title:'Caminho de produção',phase:'Design',question:'Adaptar, complementar, produzir ou fazer parceria?',description:'Combine o conteúdo aproveitável com a capacidade da equipe.'},
 {title:'Recursos para a oferta',phase:'Desenvolvimento',question:'Quais recursos sustentam o curso?',description:'Considere plataforma, suporte, acompanhamento e orçamento antes de escolher a modalidade.'},
 {title:'Integração com a prática',phase:'Design e desenvolvimento',question:'Como conectar a aprendizagem ao serviço?',description:'Defina tarefas aplicadas e a possibilidade de apoio por telessaúde.'},
 {title:'Piloto e orientação final',phase:'Avaliação',question:'Qual é a orientação final para a oferta?',description:'Informe a situação do piloto e da certificação para receber a orientação automática e as próximas providências.'}
];
export type TrailState=PlatformRequirements & {audience:string;goal:string;uf:string;id:string;local:string;mobile:string;time:string;content:string;team:string;budget:string;lms:string;facilitation:string;specialist:string;acs:string;pilot:string;certification:string;measurementSource:string;measurementDate:string;measurementPlace:string;download:string;upload:string;devices:string;skipData:boolean};
export function canAdvance(step:number,v:TrailState,hasData:boolean,hasError:boolean,loading:boolean){
 const fields: (keyof TrailState)[][]=[['audience','goal','acs'],['budget',...visibleRequirements(v)],['time'],['content','team'],['lms','facilitation'],['specialist'],['pilot','certification']];
 if(step<0||step>=fields.length)return false;
 if(fields[step].some(k=>!v[k]))return false;
 if(step===1&&['teams','meet','zoom','webex','bbb'].includes(v.conferenceExisting)&&!v.licenseFit)return false;
 if(step===1)return !assessPlatforms(v).invalid && !loading && (hasData || (hasError && v.skipData));
 return true;
}
