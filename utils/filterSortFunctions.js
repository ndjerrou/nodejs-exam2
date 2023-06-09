export const sortFunction = (data, param) => {

  if (!param) return data.sort((a, b) => a.id - b.id); // sort by id by default

  const toSort = param.split('-')[0];
  const order = param.split('-')[1];

  if (order === 'ASC') {
    return data.sort((a, b) => a[toSort].localeCompare(b[toSort], "fr", {
      ignorePunctuation: true,
      sensitivity: 'base'
    }));
  }
  return data.sort((a, b) => -(a[toSort].localeCompare(b[toSort], "fr", {
    ignorePunctuation: true,
    sensitivity: 'base'
  })));

}


export const filterFunction = (data, filters) => {
  const fields = Object.keys(filters);
  if (fields.length === 0) return data;
  let filteredData = [...data];

  fields.forEach(field => {
    filteredData = filteredData.filter((data) => {
      if (filters[field]) return data[field].toLowerCase() === filters[field].toLowerCase();
      return true;

    })
  });

  return filteredData;
}