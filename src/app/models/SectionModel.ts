export interface SectionModel {
  id: number;
  title: string;
  image: string;
  intro: string;
  description: string;
  href: string;
}

// sections
export const sections = ['web', 'native', 'cross-platform', "miscellaneous"]


// Get section code
export function getSectionCode(path: string) {
  if (path.includes('/' + sections[0])) {
    return 1;
  } else if (path.includes('/' + sections[1])) {
    return 2;
  } else if (path.includes('/' + sections[2])) {
    return 3;
  } else if (path.includes('/' + sections[3])) {
    return 4;
  }
  return 0;
}

export namespace SectionModel {

}
