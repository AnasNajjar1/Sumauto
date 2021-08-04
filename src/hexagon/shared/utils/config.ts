import { formVehicleOptions } from '../../../config/config';
import { QuestionKey } from '../../interfaces';

export const displayQuestion = (question: QuestionKey) =>
    formVehicleOptions.questionsGroup.flat().includes(question);
export const isMandatoryQuestion = (question: QuestionKey) =>
    formVehicleOptions.required.includes(question);
