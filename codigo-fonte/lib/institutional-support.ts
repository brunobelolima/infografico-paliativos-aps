import institutions from '../data/institutions.json';
import coordinates from '../data/municipal-coordinates.json';
import type {TrailState} from './trail';
export function needsInstitutionalSupport(v:TrailState){return ['partial','none'].includes(v.team)||['no','unknown'].includes(v.facilitation);}
export function nearestInstitutions(id:string){
 const coords=coordinates as Record<string,number[]>;const origin=coords[id];if(!origin)return [];
 const rad=(n:number)=>n*Math.PI/180;
 return institutions.flatMap(institution=>{const point=coords[institution.municipalityId];if(!point)return [];const a=Math.sin(rad(point[0]-origin[0])/2)**2+Math.cos(rad(origin[0]))*Math.cos(rad(point[0]))*Math.sin(rad(point[1]-origin[1])/2)**2;return [{...institution,distance:6371*2*Math.atan2(Math.sqrt(Math.min(1,a)),Math.sqrt(Math.max(0,1-a)))}]}).sort((a,b)=>a.distance-b.distance||a.name.localeCompare(b.name,'pt-BR')).slice(0,3);
}
export const supportMethod='Distância aproximada em linha reta entre as sedes municipais, entre as instituições públicas de ensino cadastradas com vínculo documentado em Cuidados Paliativos. Não representa distância rodoviária nem confirma disponibilidade de apoio pedagógico. Consultar a instituição para pactuar parceria.';
