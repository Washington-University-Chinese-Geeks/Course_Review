---
title: 贡献指南 / Contributing
slug: /contributing
sidebar_position: 99
---

# 贡献指南

感谢您愿意为 WUCG Course Review 贡献内容！您的评价会造福后来的每一位同学。

## 贡献流程（Pull Request）

所有内容修改都通过 **GitHub Pull Request** 进行。仓库维护者会 review 后合并，合并后 GitHub Actions 会自动部署到站点。

1. Fork [Washington-University-Chinese-Geeks/Course_Review](https://github.com/Washington-University-Chinese-Geeks/Course_Review) 到自己的 GitHub。
2. 创建新分支：`git checkout -b review/cse-2407-your-name`。
3. 修改或新建课程 `.mdx` 文件（见下方示例）。
4. 提交 PR，在描述中简单说明修改内容。
5. 维护者 review 后合并。Sourcery 会在 PR 中自动为新增中文内容生成英文翻译。

> 中文是 **source of truth**。请只修改中文版本（`docs/` 目录），英文版本（`i18n/en/...`）会由 Sourcery 自动同步。如果 Sourcery 翻译有误，可以直接编辑 `i18n/en/` 下对应文件。

## 为已有课程添加评价

每门已有评价的课程都是一个独立的 `.mdx` 文件，位置在：

```
docs/cs/reviews/cse-XXXX.mdx
docs/math/reviews/math-XXXX.mdx
docs/econ/reviews/econ-XXXX.mdx
```

在文件末尾追加一个 `<CourseReview>` 组件即可：

```mdx
<CourseReview
  reviewer="匿名 / 你的名字"
  professor="教授姓名"
  semester="Fall 2025"
  content={`客观事实：这节课讲什么内容、作业形式、考试安排…`}
  evaluation={`主观评价：讲得怎么样、作业强度、分好不好拿…`}
  tips={`小 tips：选这节课需要注意什么。`}
/>
```

**写作建议**：

- 客观事实（"这节课讲 Java"）写在 `content`。
- 主观评价（"这节课教授讲得很好"）写在 `evaluation`。
- Tips 放选课建议、踩坑提示、推荐工具等。

## 为未评价的课程创建页面

如果课程列表中暂时没有你想评价的课程（常见于 Math / Econ），请新建文件：

```mdx
---
title: CSE 4XXX — Course Title
sidebar_label: CSE 4XXX
---

# CSE 4XXX: Course Title

<CourseInfo
  code="CSE 4XXX"
  title="Course Title"
  oldCodes={["CSE 3XX"]}
  lastOffered="Spring 2026"
  link="https://bulletin.wustl.edu/..."
  description="官方课程简介。"
/>

<CourseReview
  reviewer="..."
  professor="..."
  content={`...`}
  evaluation={`...`}
  tips={`...`}
/>
```

然后在对应部门的 `index.mdx`（例如 `docs/cs/index.mdx`）的课程列表里把这门课的 `CourseCard` 加上 `hasReview` 并指向新页面。

## 添加一门全新课程（部门未包含）

- 在部门 `index.mdx` 添加一张 `<CourseCard>`。
- 如果有评价，就按上面流程创建 `reviews/` 下的 `.mdx`。

## 本地预览

```bash
npm install
npm start         # 中文站点
npm run start:en  # 英文站点
npm run build     # 生产构建（CI 也会跑）
```

## 行为准则

- 评价请尽量客观，避免人身攻击。对教授的批评请聚焦在教学相关问题。
- 不要上传考试题目、答案等违反 WashU Academic Integrity 的内容。
- 每人可以对同一门课留多条评价（不同学期 / 不同教授）。

---

# Contributing (English)

Thank you for contributing to WUCG Course Review!

All content changes go through **GitHub Pull Requests**. Maintainers review and merge; GitHub Actions then auto-deploys the site.

**Chinese is the source of truth.** Only edit files in `docs/`. English translations in `i18n/en/` are generated automatically by Sourcery on new PRs. If Sourcery produces a bad translation, feel free to fix the English file directly.

### Adding a review to an existing course

Append a `<CourseReview>` block at the end of the relevant `docs/<dept>/reviews/<code>.mdx` file — see the Chinese section above for the exact component API.

### Creating a page for an un-reviewed course

1. Create `docs/<dept>/reviews/<code>.mdx` with frontmatter and a `<CourseInfo>` / `<CourseReview>` block.
2. Update the department's `index.mdx` to link the card to the new page and flag `hasReview`.

### Local development

```bash
npm install
npm start         # Chinese site (default locale)
npm run start:en  # English preview
npm run build     # Production build
```
