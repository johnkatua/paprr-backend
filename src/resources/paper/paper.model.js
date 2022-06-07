import moongose from 'moongose';

const paperSchema = new moongose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    file: {
      type: String,
      required: true
    },
    year: {
      type: String,
      required: true,
      enum: ['firstYear', 'secondYear', 'thirdYear', 'fourthYear'],
      default: 'firstYear'
    },
    academicYear: {
      type: String,
      required: true
    },
    status: {
      type: String,
      required: true,
      enum: ['mainExam', 'cat'],
      default: 'mainExam'
    },
    due: Date,
    course: {
      type: moongose.SchemaTypes.ObjectId,
      ref: 'course',
      required: true,
    },
    faculty: {
      type: moongose.SchemaTypes.ObjectId,
      ref: 'faculty',
      required: true
    }
  },
  { timestamps: true }
);

export const Paper = moongose.model('paper', paperSchema);