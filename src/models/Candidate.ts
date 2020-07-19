import {
    Model,
    DataTypes
} from 'sequelize';

import { sequelize } from '../sequelize';
import Candidate from '../interfaces/Candidate';

const uuid: string = require('../utils/globals').uuid;

export class CandidateDTO extends Model<Candidate> implements Candidate {
    id?: string | undefined;
    name!: string;
    birthDate!: string;
    rg!: string;
    cpf!: string;
    motherName!: string;
    fatherName!: string;
    address!: string;
    neighborhood!: string;
    zipCode!: string;
    country!: string;
    mobileNumber!: string;
    phoneNumber!: string;
    schooling!: string;
    schoolName!: string;
    enrollmentDate!: string;
};

CandidateDTO.init({
    id: {
        type: DataTypes.STRING(64),
        primaryKey: true,
        field: 'id',
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING(128),
        field: 'candidate_name'
    },
    birthDate: {
        type: DataTypes.STRING(32),
        field: 'birth_date'
    },
    rg: {
        type: DataTypes.STRING(16),
        field: 'rg'
    },
    cpf: {
        type: DataTypes.STRING(32),
        field: 'cpf'
    },
    motherName: {
        type: DataTypes.STRING(128),
        field: 'mother_name'
    },
    fatherName: {
        type: DataTypes.STRING(128),
        field: 'father_name'
    },
    address: {
        type: DataTypes.STRING(128),
        field: 'father_name'
    },
    neighborhood: {
        type: DataTypes.STRING(128),
        field: 'neighborhood'
    },
    zipCode: {
        type: DataTypes.STRING(8),
        field: 'zip_code'
    },
    country: {
        type: DataTypes.STRING(128),
        field: 'country'
    },
    mobileNumber: {
        type: DataTypes.STRING(11),
        field: 'mobile_number'
    },
    phoneNumber: {
        type: DataTypes.STRING(11),
        field: 'phone_number'
    },
    schooling: {
        type: DataTypes.STRING(128),
        field: 'schooling'
    },
    schoolName: {
        type: DataTypes.STRING(128),
        field: 'school_name'
    },
    enrollmentDate: {
        type: DataTypes.STRING(32),
        field: 'enrollment_date'
    }
}, {
    sequelize,
    modelName: 'CandidateDTO',
});

CandidateDTO.beforeCreate((candidate: CandidateDTO) => {
    candidate.id = uuid;
});