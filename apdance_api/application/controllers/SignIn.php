<?php
/**
 * Created by PhpStorm.
 * User: MAXX-DEV-PC
 * Date: 13/12/2017
 * Time: 17:37
 */

defined('BASEPATH') OR exit('No direct script access allowed');

require APPPATH . '/libraries/REST_Controller.php';
/**
 * @property CI_DB_query_builder db
*/
class SignIn extends REST_Controller
{
    public function __construct()
    {
        parent::__construct();
    }


    public function index_post(){
        $postData = $this->post();

        $keys = array(
            'user_name',
            'user_email',
            'user_login',
            'user_passwd',
            'user_phone_number',
            'user_date_birth',
            'user_access_type',
        );

        //remover parametros nao esperados
        foreach ($postData as $key => $postDatum) {
            if(!in_array($key, $keys)){
                unset($postData[$key]);
            }
        }

        $postData['user_passwd'] = md5($postData['user_passwd']);

        $this->db->insert("users", $postData);

        $id = $this->db->insert_id();

        $this->response(array(
           'success'=>!empty($id),
           'msg'=>!empty($id) ? 'Usuário cadastrado com sucesso. Agora você está pronto para o proximo passo.': "Falha no cadastro. Verifique os dados."
        ));



    }
}