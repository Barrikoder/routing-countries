import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const countrySchema = new Schema({
  name: { type: String, required: [true, 'Name is required for a country'] },
  alpha2Code: { type: String, required: [true, 'alpha2Code is required for a country'] },
  alpha3Code: { type: String, required: [true, 'alpha3Code is required for a country'] }
});

const Country = model('Country', countrySchema);

export default Country;