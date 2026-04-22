import React from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import Translate, {translate} from '@docusaurus/Translate';

export default function Home() {
  return (
    <Layout
      title={translate({
        id: 'landing.title',
        message: 'WUCG Course Review',
      })}
      description={translate({
        id: 'landing.description',
        message:
          'First-hand course reviews and advice for WashU CS, Math, and Economics students.',
      })}>
      <header className="hero-landing">
        <div className="container">
          <h1 style={{fontSize: '3rem', margin: 0}}>
            <Translate id="landing.heading">WUCG 课程评价</Translate>
          </h1>
          <p style={{fontSize: '1.25rem', marginTop: '1rem', maxWidth: 720, marginInline: 'auto'}}>
            <Translate id="landing.tagline">
              一个分享 WashU 课程评价的社区文档，让同学们获取课程一手信息。让我们互相帮助，在学到真家伙的同时保住 GPA！
            </Translate>
          </p>
          <div className="hero-landing__buttons">
            <Link className="button button--lg button--secondary" to="/cs/">
              <Translate id="landing.btn.cs">CS 课程</Translate>
            </Link>
            <Link className="button button--lg button--secondary" to="/math/">
              <Translate id="landing.btn.math">Math 课程</Translate>
            </Link>
            <Link className="button button--lg button--secondary" to="/econ/">
              <Translate id="landing.btn.econ">Econ 课程</Translate>
            </Link>
          </div>
        </div>
      </header>
      <main className="container margin-vert--lg">
        <div className="row">
          <div className="col col--4">
            <h3>
              <Translate id="landing.how.read.title">我要看课</Translate>
            </h3>
            <p>
              <Translate id="landing.how.read.body">
                从顶部导航选择 CS / Math / Econ，进入后在左侧大纲中找到你想了解的课程。阅读评价时请结合自身情况——教授、考试、作业安排都可能随学期变化，重要信息请自行确认。
              </Translate>
            </p>
          </div>
          <div className="col col--4">
            <h3>
              <Translate id="landing.how.write.title">我要写评价</Translate>
            </h3>
            <p>
              <Translate id="landing.how.write.body">
                感谢您的贡献！您的评价会造福无数同学。请在 GitHub 仓库中 fork 并提交 Pull Request：为已有课程页面添加一个新的 CourseReview 区块，或新建课程页面。客观事实写在“课程内容”，主观感受写在“课程评价”。
              </Translate>
            </p>
            <Link to="/contributing">
              <Translate id="landing.how.write.link">贡献指南 →</Translate>
            </Link>
          </div>
          <div className="col col--4">
            <h3>
              <Translate id="landing.how.i18n.title">多语言</Translate>
            </h3>
            <p>
              <Translate id="landing.how.i18n.body">
                中文为评价原文（source of truth）。英文翻译会在新 PR 合并时由 Sourcery 自动生成。右上角可切换语言。
              </Translate>
            </p>
          </div>
        </div>
      </main>
    </Layout>
  );
}
