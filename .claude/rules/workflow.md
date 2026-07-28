# 工作流规则

本项目采用「一项任务、一个分支、一个 worktree、一个 Pull Request」的协作方式。
`README.md`、`apps/www/README.md` 和 `apps/www/docs/superpowers/specs/` 是行为契约的
权威参考；实现与文档冲突时，先确认并更新契约，不得在代码中静默绕过。

## 1. 接任务与确认范围

开始开发前，先明确：

- 问题背景、目标和验收标准。
- 是否改动页面结构、样式系统、站点元数据或对外文案。
- 是否引入服务端行为（Server Action、Route Handler、数据存储）——目前项目没有后端。
- 应先阅读哪些文档和 `.claude/rules/` 规则。

## 2. 垂直拆分任务

大需求必须按用户可观察、可独立验收的行为垂直拆分，不得按样式、组件、测试等技术层横向拆分。
一个垂直切片应包含交付该行为所需的标记、样式、逻辑、测试和文档改动。

错误示例（横向拆分）：

```text
任务 1：写好 .social-links 样式
任务 2：改 page.tsx 结构
任务 3：补测试
```

上述任务的中间状态通常无法独立使用、验证或安全回退。

正确示例（垂直拆分）：

```text
任务 1：页脚展示真实社交账号链接
任务 2：订阅表单把邮箱提交到邮件服务
任务 3：订阅失败时展示可重试的错误状态
```

每个切片遵循以下规则：

- 用一句话描述访问者可观察到的结果，并给出明确输入、输出和验收方式。
- 优先交付最窄的端到端 happy path，再增加边界条件、异常处理和性能优化。
- 包含完成该行为所需的全部层以及对应测试，不把「补测试」留成后续独立切片。
- 独立可构建、可测试、可审查、可合并、可回退，不依赖尚未合入的后续切片才成立。
- 基础重构只有在能独立说明价值、边界和验证结果时才单独成任务；否则归入需要它的切片。
- 若一句话中需要用「以及」「顺便」连接两个无关结果，应继续拆分。

拆分完成后逐项检查：

```text
□ 访问者能观察到什么变化？
□ 是否能独立写出验收测试？
□ 是否包含完成行为所需的全部技术层？
□ 合并后仓库是否仍然可运行？
□ 是否可以独立回退而不影响其他能力？
□ 是否混入第二个无关行为？
```

一个足够小的垂直切片通常对应一个原子 commit 和一个 Pull Request。若一个切片仍需要多个
commit，每个 commit 也必须满足第 8 节的原子性要求，且任一中间状态都必须可构建、可验证。

## 3. 禁止直接在 main 提交代码

`main` 是受保护的默认分支，**禁止在 `main` 上直接开发或提交**。

- 任何改动都必须从最新的 `main` 基线切出特性分支，并在独立 worktree 中完成。
- 提交前必须运行 `git branch --show-current`，输出不得为 `main`。
- 改动必须通过 Pull Request 合入 `main`，并通过 CI 质量门禁。
- 提交信息遵循 Conventional Commits，由 Husky `commit-msg` 和 commitlint 强制检查。

**没有例外。** 这不只是约定，GitHub 端有名为 `main protection` 的 ruleset 在强制执行，
`bypass_actors` 为空，仓库 owner 也不能绕过：

| 规则 | 效果 |
| --- | --- |
| `pull_request`（`required_approving_review_count: 0`） | 必须走 PR；不要求审批，单人仓库才不会把自己锁死 |
| `required_status_checks: [quality]` | CI 的 `quality` job 必须通过 |
| `non_fast_forward` | 禁止 force push |
| `deletion` | 禁止删除 `main` |

所以直推 `main` 会被服务端拒绝，不必依赖自觉。真遇到需要绕过的紧急情况，正确做法是先把该
ruleset 临时改为 `disabled`、处理完立即恢复，而不是在流程里留一个口子。

注意保护是用 **ruleset** 配置的，不是旧的 branch protection。
`gh api repos/<owner>/<repo>/branches/main/protection` 查不到它，会返回 404
`Branch not protected`——那个接口只看旧机制。要查现状用：

```bash
gh api repos/<owner>/<repo>/rulesets
```

## 4. 同步基线并检查现场

创建分支前，在主仓库检查工作区和现有 worktree：

```bash
git status --short
git branch --show-current
git fetch origin
git pull --ff-only origin main
git worktree list
```

若存在未提交改动，先确认其归属，不得覆盖、丢弃或混入当前任务。同一分支不能在多个 worktree
中同时检出。

## 5. 使用独立 worktree

worktree 必须与主仓库目录平级，命名为 `lingketalk-<简述>`，不得嵌套在主仓库内部。

分支命名约定：

- `feat/<简述>`
- `fix/<简述>`
- `docs/<简述>`
- `ci/<简述>`
- `chore/<简述>`

创建示例：

```bash
git worktree add \
  -b feat/social-links \
  ../lingketalk-social-links \
  origin/main
cd ../lingketalk-social-links
pnpm install
git branch --show-current
```

当前有哪些 worktree 以 `git worktree list` 的实时输出为准，文档中不维护静态清单。

## 6. 小步开发与验证

遵循红—绿—重构：

1. 先写能够暴露目标行为或缺陷的失败测试。
2. 实现让测试通过的最小改动。
3. 重构并再次验证。
4. 同步更新受影响的文档。

`apps/www/tests/` 断言的是 `next start` 渲染出的真实 HTML，运行前必须先 `pnpm build`。
开发过程中跑单条测试：

```bash
pnpm --filter @lingketalk/www exec node --test \
  --test-name-pattern "pillars" tests/rendered-html.test.mjs
```

不要把格式化、无关重构和功能修改混入同一任务。

## 7. 提交前自检

先检查改动范围：

```bash
git status --short
git diff
git diff --stat
```

提交 Pull Request 前运行完整质量门禁（`pnpm test` 会先触发构建）：

```bash
pnpm lint
pnpm check-types
pnpm test
```

自检还应确认：

- 未提交 `.env`、密钥、调试日志、临时文件或无关生成物。
- 样式写进 `app/globals.css` 的语义类名，没有混入 Tailwind 工具类。
- React / Next.js 规则留在 `packages/eslint-config`，没有加进 Biome。
- 新增交互有可见的 hover 与键盘 focus 状态，动效遵守 `prefers-reduced-motion`。
- 对外文案没有编造粉丝数、推荐语、客户 logo 或历史发布记录。
- 行为、接口或运维方式变化时，相关中文文档已同步更新。

## 8. 提交规范

### 一个 commit 是一个原子任务

每个 commit 必须对应一个原子任务：只表达一个清晰意图，能够独立审查、独立验证，并可在不破坏
其他改动的前提下安全回退。

- 功能、缺陷修复、重构、格式化和文档更新不得无关地混在同一个 commit。
- 测试应与它验证的实现放在同一个 commit，保证该 commit 自身完整。
- 为当前实现所必需的文档更新，应与实现放在同一个 commit。
- 大任务应按可验证的行为边界拆成多个 commit，而不是按文件或代码层机械拆分。
- 任一中间 commit 都不得故意留下无法构建、类型错误或测试失败的仓库状态。
- 如果提交说明中需要用「以及」「顺便」连接两个无关目的，应继续拆分。

例如，“页脚展示真实社交账号链接”可以作为一个原子任务，包含实现和测试；无关的订阅区间距
调整应放入另一个 commit。

提交信息格式为 `<type>: <中文说明>`，例如：

```bash
git commit -m "feat: 页脚展示真实社交账号链接"
git commit -m "fix: 修复导航下划线悬停时不展开"
git commit -m "test: 补充订阅表单校验测试"
git commit -m "docs: 完善本地开发说明"
```

提交前再次确认当前分支：

```bash
git branch --show-current
```

## 9. Pull Request

推送分支：

```bash
git push -u origin feat/social-links
```

Pull Request 描述至少包含：

```markdown
## 背景

为什么需要这个改动。

## 改动

- 修改了什么。
- 有哪些重要设计决策。

## 验证

- 运行了哪些自动化检查。
- 如何手工验证。

## 风险

兼容性、发布或回滚风险。
```

一个 Pull Request 只交付一个可独立验收的垂直切片。大型需求应按第 2 节的用户行为拆分；
每个 Pull Request 包含完成该行为所需的实现、测试和文档改动，并保持仓库可构建、可测试。

## 10. Review 与 CI

- 收到 Review 意见后，先确认问题和影响范围，再在原分支修复并补充测试。
- 回复评论时说明改了什么、如何验证，不要只回复「已修改」。
- 不得为消除评论而绕过既有约定。
- CI 全部通过、所有阻塞评论处理完毕后才能合并。

## 11. 合并后清理

清理前确认 worktree 没有未提交内容：

```bash
git -C ../lingketalk-social-links status --short
```

远端分支不用手动删：仓库开了 **Automatically delete head branches**，PR 合并后 GitHub 会
自己删掉它。所以合并后只需清理本地的 worktree 和分支：

```bash
git worktree remove ../lingketalk-social-links
git branch -d feat/social-links
git fetch origin --prune
git worktree prune
```

`--prune` 用来清掉已经在远端消失的追踪引用。若远端分支意外还在（例如 PR 是关闭而非合并的），
再补一句 `git push origin --delete feat/social-links`。

分支不长期保留。删除前若发现未提交内容，应先确认并处理，不得强制丢弃。
