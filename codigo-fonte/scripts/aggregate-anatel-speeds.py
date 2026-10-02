"""Usage: python scripts/aggregate-anatel-speeds.py ZIP OUTPUT RETRIEVED_DATE.
Aggregate official mobile measurements without retaining geolocation or test IDs.
"""
import collections,csv,io,json,math,sys,zipfile
archive,output,retrieved=sys.argv[1:]
agg={}
with zipfile.ZipFile(archive) as z, z.open('Dados_QoE.csv') as f:
 for r in csv.DictReader(io.TextIOWrapper(f,encoding='utf-8-sig'),delimiter=';'):
  try: d=float(r['VELOCIDADE_DOWNLOAD']); u=float(r['VELOCIDADE_UPLOAD'])
  except ValueError: continue
  if not math.isfinite(d+u) or d<0 or u<0: continue
  a=agg.setdefault((r['CODIGO IBGE'],r['PERIODO']),[0,0.,0.]); a[0]+=1;a[1]+=d;a[2]+=u
latest={}
for (id,p),a in agg.items():
 if id not in latest or p[3:]+p[:2]>latest[id]['period'][3:]+latest[id]['period'][:2]:
  latest[id]={'period':p,'samples':a[0],'download':round(a[1]/a[0],2),'upload':round(a[2]/a[0],2)}
out={'source':'https://www.anatel.gov.br/dadosabertos/paineis_de_dados/qualidade/medidas_qoe_smp.zip','retrieved':retrieved,'method':'Média aritmética das medições válidas de download e upload, todas as prestadoras e tecnologias, no último mês disponível para cada município.','municipalities':latest}
with open(output,'w') as f: json.dump(out,f,ensure_ascii=False,separators=(',',':'))
print(f'{len(latest)} municipalities')
