import express from 'express';

function view(req: express.Request, res: express.Response): void {
    res.sendFile('display.html', { root: './static' })
}

export default view;