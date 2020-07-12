import {
    Model,
    DataTypes
} from 'sequelize';

import { sequelize } from '../sequelize';

class CandidateDTO extends Model {};

CandidateDTO.init({
    name: {
        type: DataTypes.STRING(128),
        field: 'candidate_name'
    }
}, {
    sequelize,
    modelName: 'CandidateDTO'
});