/**
 * gitlab
 */
const gitlabServer = require('../config/gitlabServer');
var http = require('http');

module.exports = {
    //获取所有项目
    getProjects(req, res){
        var params = Object.assign({}, gitlabServer, {
            path: '/api/v4/projects?per_page=100',
            method: 'GET'
        });
        var reqGit = http.request(params, resGit => {
            resGit.setEncoding('utf8');
            var rawData = '';
            resGit.on('data', (chunk) => {
                rawData += chunk;
            });
            resGit.on('end', () => {
                var projects = JSON.parse(rawData);
                res.json({
                    code: 200,
                    data: projects
                })
            });
        });
        reqGit.on('error', e => {
            res.json({
                code: 500,
                error: e
            })
        });
        reqGit.end();
    },
    //获取项目下的分支
    getBranches(req, res){
        var project = req.params.project;
        var params = Object.assign({}, gitlabServer, {
            path: `/api/v4/projects/${project}/repository/branches`,
            method: 'GET'
        });
        var reqGit = http.request(params, resGit => {
            resGit.setEncoding('utf8');
            var rawData = '';
            resGit.on('data', (chunk) => {
                rawData += chunk;
            });
            resGit.on('end', () => {
                var branches = JSON.parse(rawData);
                res.json({
                    code: 200,
                    data: branches
                })
            });
        });
        reqGit.on('error', e => {
            res.json({
                code: 500,
                error: e
            })
        });
        reqGit.end();
    },
    //获取项目下的commit
    getCommits(req, res){
        var project = req.params.project;
        var branch = req.params.branch;
        var params = Object.assign({}, gitlabServer, {
            path: `/api/v4/projects/${project}/repository/commits?ref_name=${branch}`,
            method: 'GET'
        });
        var reqGit = http.request(params, resGit => {
            resGit.setEncoding('utf8');
            var rawData = '';
            resGit.on('data', (chunk) => {
                rawData += chunk;
            });
            resGit.on('end', () => {
                var commits = JSON.parse(rawData);
                res.json({
                    code: 200,
                    data: commits
                })
            });
        });
        reqGit.on('error', e => {
            res.json({
                code: 500,
                error: e
            })
        });
        reqGit.end();
    },
    //获取项目下某一个sha的diff
    getDiff(req, res){
        var project = req.params.project;
        var sha = req.params.sha;
        var params = Object.assign({}, gitlabServer, {
            path: `/api/v4/projects/${project}/repository/commits/${sha}/diff`,
            method: 'GET'
        });
        var reqGit = http.request(params, resGit => {
            resGit.setEncoding('utf8');
            var rawData = '';
            resGit.on('data', (chunk) => {
                rawData += chunk;
            });
            resGit.on('end', () => {
                var diffs = JSON.parse(rawData);
                res.json({
                    code: 200,
                    data: diffs
                })
            });
        });
        reqGit.on('error', e => {
            res.json({
                code: 500,
                error: e
            })
        });
        reqGit.end();
    }
}