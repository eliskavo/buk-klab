import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import { Layout } from '../../components/Layout/Layout';
import { FormInput } from '../../components/FormInput/FormInput';
import { FormWrapper } from '../../components/FormWrapper/FormWrapper';
import community_girls from '../../assets/images/community_girls.png';
import { createClub } from '../../api/clubsApi';
import { useAuth } from '../../context/AuthContext';
import style from './CreateClub.module.scss';

type FormData = {
  name: string;
  description: string;
};

export const CreateClub: React.FC = () => {
  const user = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<FormData>({
    name: '',
    description: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [id, setId] = useState<number | null>(null);

  useEffect(() => {
    if (!user) {
      navigate('/signin');
    }
  }, [user]);

  if (!user) {
    return null;
  }

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const newClub = await createClub(formData, user.id);

      setIsSubmitted(true);
      setId(newClub.id);
    } catch (error) {
      console.error('Error creating club:', error);
    }
  };

  const onChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [target.name]: target.value,
    }));
  };

  return (
    <Layout>
      <div className={style.createClubPage}>
        {isSubmitted ? (
          <div>
            <h1>Club created successfully!</h1>
            <p>
              {' '}
              view your brand new{' '}
              <Link to={`/clubs/${id}`}>{formData.name}</Link>
            </p>
          </div>
        ) : (
          <FormWrapper
            title="Create Club"
            onSubmit={onSubmit}
            submitText="Create"
          >
            <FormInput
              type="text"
              name="name"
              placeholder="Club Name"
              required
              onChange={onChange}
              value={formData.name}
            />

            <FormInput
              type="text"
              name="description"
              placeholder="Club Description"
              required
              onChange={onChange}
              value={formData.description}
            />
          </FormWrapper>
        )}

        <img
          src={community_girls}
          alt="Create Club"
          className={style.illustrationSection}
        />
      </div>
    </Layout>
  );
};
