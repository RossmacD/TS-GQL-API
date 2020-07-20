import Knex from 'knex';
// @ts-ignore
import knexfile from '../knexfile';

class Database {
  private knexInstance: Knex;
  private config: object;

  connect(options = {}): void {
    if (this.knexInstance) {
      return;
    }
    this.knexInstance = Knex({ ...(knexfile as any), ...options });
  }

  get query(): Knex {
    if (!this.knexInstance) {
      this.connect();
    }
    return this.knexInstance;
  }

  close(done: any): void {
    if (!this.knexInstance) {
      done();
      return;
    }

    this.knexInstance.destroy(done);
  }
}

export default new Database();

