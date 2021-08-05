export default class Practitioners {
    static fromFB(doc) {
        const practitioners = new Practitioners("");

        const data = doc.data();
        practitioners.id = doc.id;
        practitioners.userId = data.userId;
        practitioners.firstName = data.firstName;
        practitioners.surName = data.surname;
        practitioners.hpcsa = data.hpcsa;
        practitioners.practiceNum = data.practiceNum;

        return practitioners;
    }
}
