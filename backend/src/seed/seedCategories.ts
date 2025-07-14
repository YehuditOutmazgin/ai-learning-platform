import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Category from '../models/Category';
import SubCategory from '../models/SubCategory';

dotenv.config();

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI!);
    console.log('Connected to DB');

    await Category.deleteMany({});
    await SubCategory.deleteMany({});

    const science = new Category({ name: 'Science' });
    const history = new Category({ name: 'History' });

    await science.save();
    await history.save();

    const subs = [
      { name: 'Space', categoryId: science._id },
      { name: 'Physics', categoryId: science._id },
      { name: 'Ancient', categoryId: history._id },
      { name: 'Modern', categoryId: history._id },
    ];

    await SubCategory.insertMany(subs);

    console.log('✅ Categories and SubCategories seeded');
    process.exit(0);
  } catch (err) {
    console.error('❌ Seed failed', err);
    process.exit(1);
  }
};

seed();
