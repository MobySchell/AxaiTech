export default class Patients {
  static fromFB(doc) {
      const patients = new Patients("");

      const data = doc.data();
      patients.id = doc.id;
      patients.firstName = data.firstName;
      patients.surName = data.surname;
      patients.age = data.age;
      patients.gender = data.gender;
      patients.diagnosis = data.diagnosis;

      return patients;
  }
}