const fs = require('fs');
const path = require('path');

const tinaDir = path.join(__dirname, 'tina');
const generatedDir = path.join(tinaDir, '__generated__');

const schemaPath = path.join(generatedDir, '_schema.json');
const lookupPath = path.join(generatedDir, '_lookup.json');
const graphqlPath = path.join(generatedDir, '_graphql.json');
const lockPath = path.join(tinaDir, 'tina-lock.json');

if (!fs.existsSync(schemaPath) || !fs.existsSync(lookupPath) || !fs.existsSync(graphqlPath)) {
  console.error('Error: Generated schema files not found in tina/__generated__');
  process.exit(1);
}

const schema = JSON.parse(fs.readFileSync(schemaPath, 'utf8'));
const lookup = JSON.parse(fs.readFileSync(lookupPath, 'utf8'));
const graphql = JSON.parse(fs.readFileSync(graphqlPath, 'utf8'));

const lockContent = {
  schema,
  lookup,
  graphql
};

fs.writeFileSync(lockPath, JSON.stringify(lockContent));
console.log('Successfully updated tina/tina-lock.json with', schema.collections.map(c => c.name).join(', '));
