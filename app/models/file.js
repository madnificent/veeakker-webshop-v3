import { computed } from '@ember/object';
import DS from 'ember-data';
const { Model, attr } = DS;

export default class FileModel extends Model {
  @attr() filename;

  @computed('id')
  get downloadUrl(){
    if( this.get('id') )
      return `/files/${this.get('id')}/download`;
    return undefined;
  }

  sizedImageUrl( { width = null, height = null } ){
    const params = { width, height };

    // build query params string
    var esc = encodeURIComponent;
    var query = Object.keys(params)
        .filter( k => params[k] !== null )
        .map(k => esc(k) + '=' + esc(params[k]))
        .join('&');

    // build the resulting uri
    if( this.get('id') )
      return `/images/${this.get('id')}?${query}`;

    return undefined;
  }
}
