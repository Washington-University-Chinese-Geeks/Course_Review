# WUCG 课程评价 · WUCG Course Review

> **中文 (source of truth)** · [English below](#english)

一个分享 WashU 课程评价的社区文档，让同学们获取课程一手信息和评价。让我们互相帮助，在学到真家伙的同时保住自己珍贵的 GPA！

站点以 Docusaurus 为基础构建，分为三大板块：**CS**（计算机）、**Math**（数学）、**Econ**（经济学），课程目录基于 [Washington University in St. Louis](https://wustl.edu/) 官方 Bulletin。

---

## 使用指南

### 我要看课

在顶部导航选择 CS / Math / Econ，进入后可以在左侧大纲中找到自己的课程。查看别人评价时需要根据自身情况考虑。同时很多课程考试、作业、分数安排会随着教授和时间而变更，遇到重要的信息还是要自己确认一下。

### 我要写评价

感谢您的贡献！您的评价会造福无数同学。

请在 GitHub 仓库里 **fork 并提交 Pull Request**：

1. 找到课程文件 `docs/<dept>/reviews/<code>.mdx`。
2. 在文件末尾追加一个 `<CourseReview>` 区块：

   ```mdx
   <CourseReview
     reviewer="你的名字 / 匿名"
     professor="教授姓名"
     semester="Fall 2025"
     content={`客观事实：这节课讲什么、作业形式、考试安排...`}
     evaluation={`主观评价：讲得怎么样、作业强度、分好不好拿...`}
     tips={`小 tips：选这节课需要注意什么。`}
   />
   ```

3. 如果课程列表里还没有这门课，请复制任意已有的 `.mdx` 作为模板新建一个文件。

**填写评价中，注意尽量将客观事实**（"例如，这节课讲 Java"）写在 `content`（课程内容）当中；**将主观评价**（"例如，这节课教授讲得很好"）写在 `evaluation`（课程评价）当中。

详细的开发说明在 [AGENTS.md](./AGENTS.md)。

### 多语言

- 中文为评价原文（**source of truth**），放在 `docs/`。
- 英文翻译放在 `i18n/en/`，由 [Sourcery](https://sourcery.ai/) 在新 PR 中自动生成。
- 如果 Sourcery 的翻译有误，可以直接修改 `i18n/en/` 下对应文件；Sourcery 不会覆盖手动修改。
- 右上角可切换语言。

---

## 站点架构

| 板块 | 路径 | 说明 |
| --- | --- | --- |
| 计算机 CS | `docs/cs/` | WashU CSE 全部本科与部分研究生课程 |
| 数学 Math | `docs/math/` | WashU Math & Statistics 全部本科与研究生课程 |
| 经济 Econ | `docs/econ/` | WashU Economics 全部本科课程 |

每个板块下有一个 `index.mdx`（课程目录页），以及 `reviews/` 文件夹（每门有评价的课程一个 `.mdx`）。

## 本地开发

```bash
npm install           # 安装依赖
npm start             # 开发服务器（中文）
npm run start:en      # 开发服务器（英文）
npm run build         # 生产构建
```

需要 Node ≥ 18。

## 部署

推送到 `main` 后，[`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) 会：

1. 拉代码 → `npm ci` → `npm run build`。
2. 把 `build/` 上传为 GitHub Pages artifact。
3. 部署到 `https://washington-university-chinese-geeks.github.io/Course_Review/`。

PR 只跑构建（不部署），用于提早发现 broken MDX。

## 自定义评价组件

站点自带三个 React 组件，写 MDX 时无需手动 import：

- `<CourseInfo>` — 课程信息卡（课号、旧课号、描述、Bulletin 链接、last offered）
- `<CourseReview>` — 单条评价块（reviewer / professor / 课程内容 / 课程评价 / tips）
- `<CourseCard>` — 目录页上的课程小卡

详细 props 见 [AGENTS.md §5](./AGENTS.md#5-component-reference)。

## 贡献流程

1. Fork & clone 本仓库。
2. `git checkout -b review/cse-2407-your-name`。
3. 修改或新建 `.mdx` 文件。
4. `npm run build` 本地验证。
5. 提交 PR 到 `main`。
6. Sourcery 会在 PR 中自动补齐英文翻译，维护者 review 后合并。

## 行为准则

- 评价请尽量客观，避免人身攻击。对教授的批评请聚焦在教学相关问题。
- 请勿上传考试题目、答案、solution set 等违反 WashU Academic Integrity 的内容。
- 每人可以对同一门课留多条评价（不同学期 / 不同教授）。

## License

- **内容**：[CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/)
- **代码**：MIT（见 [LICENSE](./LICENSE)）

---

## English

A community-maintained documentation site sharing first-hand course reviews
for Washington University in St. Louis. Browse reviews, pick classes with
open eyes, and share your own experience so the next cohort has an easier
time — learning real stuff *and* keeping their GPA alive.

The site is built with Docusaurus and split into three sections —
**CS** (Computer Science), **Math** (Mathematics & Statistics), and **Econ**
(Economics) — covering the official WashU Bulletin course listings for
each department.

### Reading reviews

Open the site, pick a department from the top nav, then find your course
in the left sidebar. Reviewers note their professor and (sometimes)
semester so you can weigh the review against your own situation.

### Writing a review

1. Fork this repo.
2. Open `docs/<dept>/reviews/<code>.mdx` and append a `<CourseReview>`
   block (see the example in the Chinese section above).
3. If the course has no page yet, create one from any existing file as a
   template.
4. Open a Pull Request. Sourcery will generate the English translation
   automatically. A maintainer will review and merge.

**Style**: put objective facts in `content`, opinions in `evaluation`.

### Internationalization

Chinese (`docs/`) is the **source of truth**. English lives in `i18n/en/`
and is auto-generated on PR by [Sourcery](https://sourcery.ai/). Missing
translations fall back to the Chinese source at build time, so the site
always renders even if a translation hasn't landed yet.

### Local development

```bash
npm install
npm start          # Chinese (default)
npm run start:en   # English preview
npm run build      # Production build
```

Node ≥ 18.

### More

- [AGENTS.md](./AGENTS.md) — deep contributor & agent reference.
- [`/contributing`](/contributing) on the live site — one-screen workflow.
- [WashU Bulletin](https://bulletin.wustl.edu/) — official course catalog.

---

*原始文档 seed 来自 `CS课程评价_20260421.docx`（WUCG 社区分享版）。*
