export interface GithubOnwer {
    login: string | null
    id: number
    node_id: string
    avatar_url: string
    url: string
    html_url: string
    followers_url: string
    repos_url: string
    type: string
    user_view_type: string
    site_admin: boolean
}

export interface GithubLicense {
    key: string
    name: string
    spdx_id: string
    url: string
    node_id: string
}

export interface GithubRepository {
    id: number
    node_id: string
    name: string
    full_name: string
    private: boolean
    owner: GithubOnwer
    html_url: string
    description: string
    fork: string
    url: string
    keys_url: string
    collaborators_url: string
    git_commits_url: string
    created_at: string
    updated_at: string
    pushed_at: string
    git_url: string
    ssh_url: string
    clone_url: string
    svn_url: string
    homepage: string
    size: number
    stargazers_count: number
    watchers_count: number
    language: string
    has_downloads: boolean
    open_issues_count: number
    license: GithubLicense
    topics: []
    visibility: string
    forks: number
    open_issues: number
    watchers: number
    default_branch: string
    score: number
}

export interface GithubSearchRepoRes {
    total_count: number
    incomplete_results: boolean
    items: GithubRepository[]
}