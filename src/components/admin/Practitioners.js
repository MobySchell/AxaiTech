export default class Practitioners {
  static fromFB(doc) {
      const practitioners = new Practitioners("");

      const data = doc.data();
      practitioners.id = doc.id;
      practitioners.firstName = data.firstName;
      practitioners.surName = data.surname;
      practitioners.hpcsa = data.hpcsa;
      practitioners.practiceNum = data.practiceNum;
      practitioners.status = data.status;

      return practitioners;
  }
}