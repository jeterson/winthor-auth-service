import knexfile from '../knexfile'
import Knex, {Config} from 'knex'

const db = Knex(knexfile)

export {db}
