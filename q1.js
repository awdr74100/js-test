const factories = [
  { name: 'BR1', employees: ['John', 'Alice', 'Bob', 'Jessie', 'Karen'] },
  { name: 'BR2', employees: ['Jessie', 'Karen', 'John'] },
  { name: 'BR3', employees: ['Miles', 'Eric', 'Henry', 'Bob'] },
  { name: 'BR4', employees: [] },
];

/* Count Employees Number by Factory */
(() => {
  const answer = factories.map(({ name, employees }) => {
    return { name, count: employees.length };
  });
  console.log(answer);
})();

/* Count Factories Number by Employee */
(() => {
  const answer = factories.reduce((acc, { employees }) => {
    const cache = acc; // no-param-reassign (if use eslint)
    employees.forEach((employee) => {
      const key = cache.findIndex((item) => item.employee === employee);
      key >= 0 ? (cache[key].count += 1) : cache.push({ employee, count: 1 });
    });
    return cache;
  }, []);
  console.log(answer);
})();

/* Order employees list by alphabetical order */
(() => {
  const answer = factories.map(({ name, employees }) => {
    return { name, employees: employees.sort((a, b) => a.localeCompare(b)) };
  });
  console.log(answer);
})();
