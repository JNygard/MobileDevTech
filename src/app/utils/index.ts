
import { CategoryModel } from 'app/models/CategoryModel';
import { TechModel } from 'app/models/TechModel';


export function omit<T extends object, K extends keyof T>(target: T, ...omitKeys: K[]): Omit<T, K> {
  return (Object.keys(target) as K[]).reduce(
    (res, key) => {
      if (!omitKeys.includes(key)) {
        res[key] = target[key];
      }
      return res;
    },
    {} as any
  );
}

export function getCategoryName(tech: TechModel, categories: CategoryModel[]): string {
  const categ = categories.find((cat: CategoryModel) => cat.id == tech.catId) as CategoryModel;

  if (categ != null) {
    return categ.name;
  } else {
    return "";
  }
}
