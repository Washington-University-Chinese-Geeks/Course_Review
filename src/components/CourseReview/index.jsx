import React from 'react';
import Translate from '@docusaurus/Translate';

function Section({labelId, defaultLabel, children}) {
  if (!children) return null;
  return (
    <div className="course-review__section">
      <div className="course-review__section-label">
        <Translate id={labelId}>{defaultLabel}</Translate>
      </div>
      <div className="course-review__section-body">{children}</div>
    </div>
  );
}

export default function CourseReview({
  reviewer,
  professor,
  semester,
  content,
  evaluation,
  tips,
  children,
}) {
  return (
    <div className="course-review">
      <div className="course-review__header">
        {reviewer && (
          <span>
            <span className="course-review__badge">
              <Translate id="courseReview.reviewer">Reviewer</Translate>:
            </span>{' '}
            {reviewer}
          </span>
        )}
        {professor && (
          <span>
            <span className="course-review__badge">
              <Translate id="courseReview.professor">Professor</Translate>:
            </span>{' '}
            {professor}
          </span>
        )}
        {semester && (
          <span>
            <span className="course-review__badge">
              <Translate id="courseReview.semester">Semester</Translate>:
            </span>{' '}
            {semester}
          </span>
        )}
      </div>
      <Section labelId="courseReview.content" defaultLabel="Course Content">
        {content}
      </Section>
      <Section labelId="courseReview.evaluation" defaultLabel="Evaluation">
        {evaluation}
      </Section>
      <Section labelId="courseReview.tips" defaultLabel="Tips & Notes">
        {tips}
      </Section>
      {children}
    </div>
  );
}
