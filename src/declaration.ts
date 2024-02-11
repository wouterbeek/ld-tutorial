import { Iri } from '@triplyetl/etl/generic'
import { dbo, rdf, sdo, sh, xsd } from '@triplyetl/etl/vocab'

const host = 'tripyldb.com'
export const account = 'wouter'
export const dataset = 'ld-tutorial'

const baseIri = Iri(`https://${host}/${account}/${dataset}/`)
const prefix_id = baseIri.concat('id/')
const prefix_mapping = baseIri.concat('mapping/')
const prefix_model = baseIri.concat('model/')
export const prefixes = {
  // External prefixes
  csvw: Iri('http://www.w3.org/ns/csvw#'),
  dbo: dbo.toIri(),
  ql: Iri('http://semweb.mmlab.be/ns/ql#'),
  rdf: rdf.toIri(),
  rml: Iri('http://semweb.mmlab.be/ns/rml#'),
  rr: Iri('http://www.w3.org/ns/r2rml#'),
  sdo: sdo.toIri(),
  sh: sh.toIri(),
  xsd: xsd.toIri(),
  // Internal model prefixes
  def: prefix_model.concat('def/'),
  lst: prefix_model.concat('lst/'),
  shp: prefix_model.concat('shp/'),
  // Internal mapping prefixes
  gm: prefix_mapping.concat('graph/'),
  mapping: prefix_mapping.concat('mapping/'),
  om: prefix_mapping.concat('om/'),
  pom: prefix_mapping.concat('pom/'),
  sm: prefix_mapping.concat('subject/'),
  source: prefix_mapping.concat('source/'),
  // Internal instance prefixes
  episode: prefix_id.concat('episode/'),
  graph: prefix_id.concat('graph/'),
  person: prefix_id.concat('person/'),
}
