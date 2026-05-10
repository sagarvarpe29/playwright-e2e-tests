export class TestData {
  static makeAppointmentTestData() {
    return [
      {
        testCaseId: "TC001",
        facility: "Tokyo CURA Healthcare Center",
        hcp: "Medicare",
        visitDate: "05/10/2025",
      },
      {
        testCaseId: "TC002",
        facility: "Hongkong CURA Healthcare Center",
        hcp: "Medicaid",
        visitDate: "06/15/2025",
      },
      {
        testCaseId: "TC003",
        facility: "Seoul CURA Healthcare Center",
        hcp: "None",
        visitDate: "07/20/2025",
      },
    ];
  }

  static apiUserCreation() {
    return [
      {
        name: "Sagar",
        job: "SW QA Engineer",
        id: "12346767665",
        createdAt: "2026-04-23T08:35:49.887Z",
      },
    ];
  }
}
