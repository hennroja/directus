import type { Field, RawField } from '@directus/types';
import type { Knex } from 'knex';
import type { GeoJSONGeometry } from 'wellknown';
import { GeometryHelper } from '../types.js';

export class GeometryHelperPostgres extends GeometryHelper {
	override async supported() {
		const res = await this.knex.select('oid').from('pg_proc').where({ proname: 'postgis_version' });
		return res.length > 0;
	}

	override createColumn(table: Knex.CreateTableBuilder, field: RawField | Field) {
		const type = field.type.split('.')[1] ?? 'geometry';
		return table.specificType(field.field, `geometry(${type}, 4326)`);
	}

	override _intersects_bbox(key: string, geojson: GeoJSONGeometry): Knex.Raw {
		const geometry = this.fromGeoJSON(geojson);
		return this.knex.raw('?? && ?', [key, geometry]);
	}

	asGeoJSON(table: string, column: string): Knex.Raw {
		return this.knex.raw('st_asgeojson(??.??) as ??', [table, column, column]);
	}

	override geodistance(key: string, latitude: number, longitude: number, range: number): Knex.Raw {
		return this.knex.raw(
			`ST_DWithin(
				??::geography,
				geography(ST_SetSRID(ST_MakePoint(?, ?), 4326)),
				?
			)
			`,
			[key, longitude, latitude, range],
		);
	}
}
