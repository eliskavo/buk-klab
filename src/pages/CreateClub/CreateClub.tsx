import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import { Layout } from '../../components/Layout/Layout';
import { FormInput } from '../../components/FormInput/FormInput';
import { FormTextArea } from '../../components/FormTextArea/FormTextArea';
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
  const [currentStep, setCurrentStep] = useState(1);

  useEffect(() => {
    if (user === null) {
      navigate('/signin');
    }
  }, [user]);

  if (!user) {
    return null;
  }

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (currentStep === 1) {
      setCurrentStep(2);

      return;
    }

    try {
      const newClub = await createClub(formData, user.id);

      setIsSubmitted(true);
      setId(newClub.id);
    } catch (error) {
      console.error('Error creating club:', error);
    }
  };

  const onChange = ({
    target,
  }: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [target.name]: target.value,
    }));
  };

  const handleBack = () => {
    setCurrentStep(1);
  };

  if (isSubmitted) {
    return (
      <Layout>
        <div className={style.createClubPage}>
          <div className={style.createdSection}>
            <h1 className={style.title}>Club created successfully!</h1>
            <p className={style.description}>
              view your brand new{' '}
              <Link to={`/clubs/${id}`} className={style.link}>
                {formData.name}
              </Link>
            </p>
          </div>
          <img
            src={community_girls}
            alt="Create Club"
            className={style.illustrationSection}
          />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className={style.createClubPage}>
        <div className={style.formSection}>
          <FormWrapper
            title="Create Club"
            onSubmit={onSubmit}
            submitText={currentStep === 1 ? 'Next' : 'Create'}
          >
            <div className={style.stepIndicator}>Step {currentStep}/2</div>

            {currentStep === 1 ? (
              <>
                <p className={style.description}>
                  Every great chapter starts with a name! What's yours?
                </p>
                <FormInput
                  type="text"
                  name="name"
                  placeholder="Club Name"
                  required
                  onChange={onChange}
                  value={formData.name}
                />
              </>
            ) : (
              <>
                <p className={style.description}>
                  Give your club a plot twist! Share what makes it unique and
                  why others will want to join.
                </p>

                <FormTextArea
                  type="textarea"
                  name="description"
                  placeholder="Club Description"
                  required
                  onChange={onChange}
                  value={formData.description}
                  rows={4}
                />

                <button
                  type="button"
                  onClick={handleBack}
                  className={style.backButton}
                >
                  Back
                </button>
              </>
            )}
          </FormWrapper>
        </div>

        <img
          src={community_girls}
          alt="Create Club"
          className={style.illustrationSection}
        />
      </div>
    </Layout>
  );
};
