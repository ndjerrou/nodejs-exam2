export const sortFunction = (data, param) => {

  if (!param) return data;

  const toSort = param.split('-')[0];
  const order = param.split('-')[1];

  if (order === 'ASC') {
    return data.sort((a, b) => a[toSort].localeCompare(b[toSort], "fr", {
      ignorePunctuation: true
    }));
  }
  return data.sort((a, b) => -(a[toSort].localeCompare(b[toSort], "fr", {
    ignorePunctuation: true
  })));

}


export const filterFunction = (data, filters) => {
  const fields = Object.keys(filters);
  console.log(fields);
  if (fields.length === 0) return data;
  let filteredData = [...data];

  fields.forEach(field => {
    filteredData = filteredData.filter((data) => {
      if (filters[field]) return data[field] === filters[field];
      return true;

    })
  });

  return filteredData;
}