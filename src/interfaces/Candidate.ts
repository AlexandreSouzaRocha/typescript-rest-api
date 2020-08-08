interface Candidate {
	id?: string;
	name: string;
	birthDate: string;
	rg: string;
	cpf: string;
	motherName: string;
	fatherName: string;
	address: string;
	neighborhood: string;
	zipCode: string;
	country: string;
	mobileNumber: string;
	phoneNumber: string;
	schooling: string;
	schoolName: string;
	candidateStatus: string;
	enrollmentDate?: string;
	updatedDate?: string;
}

export default Candidate;
