type Filter = { where: { id: string } };

export class InMemoryDatabase {
  private readonly db = new Map<string, any>();
  private readonly date: Date;

  constructor({ date }: { date: Date }) {
    this.date = date;
  }

  public create({ data }) {
    const id = (this.db.size + 1).toString();
    const transformedData = this.transformData(data);
    const item = {
      ...transformedData,
      id,
      createdAt: this.date,
      updatedAt: this.date,
      deletedAt: null,
    };
    this.db.set(id, item);
    return Promise.resolve(item);
  }

  public findMany() {
    return Array.from(this.db.values());
  }

  public findUnique({ where }: Filter) {
    return this.db.get(where.id);
  }

  public update({ where, data }: Filter & { data: any }) {
    const item = this.findUnique({ where });
    if (!item) return;
    const transformedData = this.transformData(data);
    const updatedItem = { ...item, ...transformedData };
    this.db.set(item.id, updatedItem);
    return updatedItem;
  }

  public delete({ where }: Filter) {
    const item = this.findUnique({ where });
    if (!item) return;
    const deletedItem = this.update({ where, data: { deletedAt: new Date() } });
    return deletedItem;
  }

  public seed(data: any[]) {
    this.db.clear();
    data.forEach((item) => this.db.set(item.id, item));
  }

  private transformData(data) {
    return Object.entries(data).reduce((acc, [key, value]) => {
      if (typeof value !== 'object' || value instanceof Date) {
        acc[key] = value;
        return acc;
      }
      const transformedKeyName = `${key}Id`;
      acc[transformedKeyName] = value['connect']['id'];
      return acc;
    }, {});
  }
}
